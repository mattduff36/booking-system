'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Upload,
  Save,
  X,
  Image as ImageIcon,
  Wand2,
  RefreshCw,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Clock,
  Loader2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { generateCastleDescription, generateAlternativeDescription } from '@/lib/utils/description-generator';
import { toast } from 'sonner';
import { getBusinessConfig } from '@/lib/config/business-config';

interface Service {
  id: number;
  name: string;
  category: string;
  size: string;
  price: number;
  description: string;
  imageUrl: string;
  maintenanceStatus?: 'available' | 'maintenance' | 'out_of_service';
  maintenanceNotes?: string;
  maintenanceStartDate?: string;
  maintenanceEndDate?: string;
}

interface ServiceFormData {
  name: string;
  category: string;
  size: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface MaintenanceForm {
  status: 'available' | 'maintenance' | 'out_of_service';
  notes: string;
  startDate: string;
  endDate: string;
}

export default function ServicesManagement() {
  const config = getBusinessConfig();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    category: '',
    size: '',
    price: 0,
    description: '',
    imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState<MaintenanceForm>({
    status: 'available',
    notes: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      // Try to fetch from services API first, fallback to castles API for backward compatibility
      let response = await fetch('/api/admin/services');
      if (!response.ok) {
        response = await fetch('/api/admin/fleet'); // Fallback to existing fleet API
      }
      
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        console.error('Failed to fetch services');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let url = '/api/admin/services';
      let method = 'POST';
      
      // If services API doesn't exist, fallback to fleet API
      if (editingService) {
        url = \`/api/admin/fleet/\${editingService.id}\`;
        method = 'PUT';
      } else {
        // Try services API first, fallback to fleet
        const testResponse = await fetch('/api/admin/services', { method: 'HEAD' });
        if (!testResponse.ok) {
          url = '/api/admin/fleet';
        }
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(editingService ? \`\${config.services.terminology.charAt(0).toUpperCase() + config.services.terminology.slice(1)} updated successfully\` : \`\${config.services.terminology.charAt(0).toUpperCase() + config.services.terminology.slice(1)} added successfully\`);
        setIsModalOpen(false);
        fetchServices();
        resetForm();
      } else {
        const error = await response.text();
        toast.error(\`Failed to save \${config.services.terminology}: \${error}\`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(\`Error saving \${config.services.terminology}\`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(\`Are you sure you want to delete this \${config.services.terminology}?\`)) {
      return;
    }

    try {
      // Try services API first, fallback to fleet API
      let response = await fetch(\`/api/admin/services/\${id}\`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        response = await fetch(\`/api/admin/fleet/\${id}\`, {
          method: 'DELETE',
        });
      }

      if (response.ok) {
        toast.success(\`\${config.services.terminology.charAt(0).toUpperCase() + config.services.terminology.slice(1)} deleted successfully\`);
        fetchServices();
      } else {
        toast.error(\`Failed to delete \${config.services.terminology}\`);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error(\`Error deleting \${config.services.terminology}\`);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      size: '',
      price: 0,
      description: '',
      imageUrl: ''
    });
    setEditingService(null);
  };

  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        category: service.category || '',
        size: service.size,
        price: service.price,
        description: service.description,
        imageUrl: service.imageUrl
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const generateDescription = async () => {
    if (!formData.name || !formData.category) {
      toast.error('Please enter service name and category first');
      return;
    }

    setIsGeneratingDescription(true);
    try {
      const description = await generateCastleDescription(formData.name, formData.category, formData.size, formData.price);
      setFormData(prev => ({ ...prev, description }));
      toast.success('Description generated successfully!');
    } catch (error) {
      console.error('Error generating description:', error);
      toast.error('Failed to generate description');
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading {config.services.terminology}...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {config.services.terminology.charAt(0).toUpperCase() + config.services.terminology.slice(1)} Management
          </h1>
          <p className="text-muted-foreground">
            Manage your {config.services.terminology} inventory and availability
          </p>
        </div>
        <Button onClick={() => openModal()} className="gap-2">
          <Plus className="h-4 w-4" />
          Add {config.services.terminology.charAt(0).toUpperCase() + config.services.terminology.slice(1)}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openModal(service)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{service.category}</Badge>
                <Badge variant="outline">{service.size}</Badge>
                <Badge variant="default">£{service.price}</Badge>
                {service.maintenanceStatus && (
                  <Badge 
                    variant={service.maintenanceStatus === 'available' ? 'default' : 'destructive'}
                  >
                    {service.maintenanceStatus}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 pt-0">
              {service.imageUrl && (
                <div className="relative h-32 mb-3 rounded-md overflow-hidden">
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <p className="text-sm text-muted-foreground line-clamp-3">
                {service.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {editingService ? 'Edit' : 'Add'} {config.services.terminology.charAt(0).toUpperCase() + config.services.terminology.slice(1)}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="size">Size</Label>
                    <Input
                      id="size"
                      value={formData.size}
                      onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (£)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="/placeholder-service.jpg"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <div className="flex gap-2">
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="flex-1"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateDescription}
                      disabled={isGeneratingDescription}
                      className="shrink-0"
                    >
                      {isGeneratingDescription ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click the magic wand to auto-generate a description
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}