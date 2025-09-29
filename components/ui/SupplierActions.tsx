import React, { useState } from 'react';
import { 
  ExternalLink, 
  Heart, 
  Mail, 
  Download, 
  Share2, 
  Eye, 
  Calculator,
  MoreHorizontal,
  Star,
  Bookmark,
  FileText,
  FileSpreadsheet
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from './dialog';
import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';
import { cn } from './utils';
import type { SupplierItem } from '../../lib/types';

interface SupplierActionsProps {
  supplier: SupplierItem;
  onViewDetails?: (supplier: SupplierItem) => void;
  onTCA?: (supplier: SupplierItem) => void;
  className?: string;
  variant?: 'default' | 'compact' | 'minimal';
}

export function SupplierActions({ 
  supplier, 
  onViewDetails, 
  onTCA, 
  className,
  variant = 'default'
}: SupplierActionsProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isTracked, setIsTracked] = useState(false);

  const handleViewWebsite = () => {
    if (supplier.apex_domain) {
      const url = supplier.apex_domain.startsWith('http') 
        ? supplier.apex_domain 
        : `https://${supplier.apex_domain}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleTrackSupplier = async () => {
    try {
      // TODO: Implement API call to track supplier
      setIsTracked(!isTracked);
      console.log('Track supplier:', supplier.supplier_id);
    } catch (error) {
      console.error('Failed to track supplier:', error);
    }
  };

  const handleFavoriteSupplier = async () => {
    try {
      // TODO: Implement API call to favorite supplier
      setIsFavorited(!isFavorited);
      console.log('Favorite supplier:', supplier.supplier_id);
    } catch (error) {
      console.error('Failed to favorite supplier:', error);
    }
  };

  const handleExportResults = (format: 'csv' | 'pdf') => {
    // TODO: Implement export functionality
    console.log(`Export results as ${format} for supplier:`, supplier.supplier_id);
  };

  const handleShareResults = () => {
    setIsShareModalOpen(true);
  };

  if (variant === 'minimal') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleViewWebsite}>
            <ExternalLink className="mr-2 h-4 w-4" />
            View Website
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsContactModalOpen(true)}>
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleTrackSupplier}>
            <Star className="mr-2 h-4 w-4" />
            {isTracked ? 'Untrack' : 'Track'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleFavoriteSupplier}>
            <Heart className="mr-2 h-4 w-4" />
            {isFavorited ? 'Unfavorite' : 'Favorite'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn("flex items-center space-x-1", className)}>
        <Button
          size="sm"
          variant="outline"
          onClick={handleViewWebsite}
          className="h-7 px-2"
        >
          <ExternalLink className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsContactModalOpen(true)}
          className="h-7 px-2"
        >
          <Mail className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant={isFavorited ? "default" : "outline"}
          onClick={handleFavoriteSupplier}
          className="h-7 px-2"
        >
          <Heart className={cn("h-3 w-3", isFavorited && "fill-current")} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 px-2">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleTrackSupplier}>
              <Star className="mr-2 h-4 w-4" />
              {isTracked ? 'Untrack' : 'Track'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewDetails?.(supplier)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onTCA?.(supplier)}>
              <Calculator className="mr-2 h-4 w-4" />
              TCA Analysis
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleExportResults('csv')}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExportResults('pdf')}>
              <FileText className="mr-2 h-4 w-4" />
              Export PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShareResults}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Results
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {/* Primary Actions */}
      <Button
        size="sm"
        variant="outline"
        onClick={handleViewWebsite}
        className="flex items-center space-x-1"
      >
        <ExternalLink className="h-4 w-4" />
        <span className="text-xs">Website</span>
      </Button>
      
      <Button
        size="sm"
        variant="outline"
        onClick={() => setIsContactModalOpen(true)}
        className="flex items-center space-x-1"
      >
        <Mail className="h-4 w-4" />
        <span className="text-xs">Contact</span>
      </Button>

      {/* Secondary Actions */}
      <Button
        size="sm"
        variant={isFavorited ? "default" : "outline"}
        onClick={handleFavoriteSupplier}
        className="flex items-center space-x-1"
      >
        <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
        <span className="text-xs">{isFavorited ? 'Favorited' : 'Favorite'}</span>
      </Button>

      <Button
        size="sm"
        variant={isTracked ? "default" : "outline"}
        onClick={handleTrackSupplier}
        className="flex items-center space-x-1"
      >
        <Star className={cn("h-4 w-4", isTracked && "fill-current")} />
        <span className="text-xs">{isTracked ? 'Tracked' : 'Track'}</span>
      </Button>

      {/* More Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center space-x-1">
            <MoreHorizontal className="h-4 w-4" />
            <span className="text-xs">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => onViewDetails?.(supplier)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onTCA?.(supplier)}>
            <Calculator className="mr-2 h-4 w-4" />
            TCA Analysis
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleExportResults('csv')}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export as CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExportResults('pdf')}>
            <FileText className="mr-2 h-4 w-4" />
            Export as PDF
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleShareResults}>
            <Share2 className="mr-2 h-4 w-4" />
            Share Results
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Contact Modal */}
      <ContactModal
        supplier={supplier}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Share Modal */}
      <ShareModal
        supplier={supplier}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}

interface ContactModalProps {
  supplier: SupplierItem;
  isOpen: boolean;
  onClose: () => void;
}

function ContactModal({ supplier, isOpen, onClose }: ContactModalProps) {
  const [emailData, setEmailData] = useState({
    subject: `Inquiry about ${supplier.name}`,
    message: '',
    contactType: 'general' as 'sales' | 'support' | 'general'
  });

  const handleSendEmail = async () => {
    try {
      // TODO: Implement email sending functionality
      console.log('Sending email to supplier:', supplier.supplier_id, emailData);
      onClose();
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  const getContactEmail = () => {
    const salesContact = supplier.contacts.find(c => c.type === 'sales' && c.email);
    const supportContact = supplier.contacts.find(c => c.type === 'support' && c.email);
    const generalContact = supplier.contacts.find(c => c.type === 'general' && c.email);
    
    switch (emailData.contactType) {
      case 'sales':
        return salesContact?.email || generalContact?.email;
      case 'support':
        return supportContact?.email || generalContact?.email;
      default:
        return generalContact?.email || supplier.contacts[0]?.email;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {supplier.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="contact-type">Contact Type</Label>
            <select
              id="contact-type"
              value={emailData.contactType}
              onChange={(e) => setEmailData(prev => ({ 
                ...prev, 
                contactType: e.target.value as 'sales' | 'support' | 'general' 
              }))}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="general">General Inquiry</option>
              <option value="sales">Sales</option>
              <option value="support">Support</option>
            </select>
          </div>

          <div>
            <Label htmlFor="email-to">To</Label>
            <Input
              id="email-to"
              value={getContactEmail() || 'No email available'}
              disabled
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={emailData.subject}
              onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={emailData.message}
              onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Enter your message..."
              className="mt-1 min-h-[100px]"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSendEmail} disabled={!getContactEmail()}>
              Send Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ShareModalProps {
  supplier: SupplierItem;
  isOpen: boolean;
  onClose: () => void;
}

function ShareModal({ supplier, isOpen, onClose }: ShareModalProps) {
  const [shareUrl, setShareUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateShareLink = async () => {
    setIsGenerating(true);
    try {
      // TODO: Implement share link generation
      const mockUrl = `${window.location.origin}/supplier/${supplier.supplier_id}`;
      setShareUrl(mockUrl);
      console.log('Generated share link for supplier:', supplier.supplier_id);
    } catch (error) {
      console.error('Failed to generate share link:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // TODO: Show success toast
      console.log('Copied to clipboard');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share {supplier.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="share-url">Share Link</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                id="share-url"
                value={shareUrl}
                readOnly
                placeholder="Click Generate to create share link"
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={copyToClipboard}
                disabled={!shareUrl}
              >
                Copy
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={generateShareLink} 
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Link'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface BulkActionsProps {
  selectedSuppliers: SupplierItem[];
  onExport: (format: 'csv' | 'pdf') => void;
  onShare: () => void;
  className?: string;
}

export function BulkActions({ 
  selectedSuppliers, 
  onExport, 
  onShare, 
  className 
}: BulkActionsProps) {
  if (selectedSuppliers.length === 0) return null;

  return (
    <div className={cn("flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg", className)}>
      <span className="text-sm text-blue-800 font-medium">
        {selectedSuppliers.length} supplier{selectedSuppliers.length > 1 ? 's' : ''} selected
      </span>
      
      <div className="flex items-center space-x-2 ml-auto">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onExport('csv')}
          className="flex items-center space-x-1"
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span>Export CSV</span>
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => onExport('pdf')}
          className="flex items-center space-x-1"
        >
          <FileText className="h-4 w-4" />
          <span>Export PDF</span>
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={onShare}
          className="flex items-center space-x-1"
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
}


