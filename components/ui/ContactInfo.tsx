import React from 'react';
import { Mail, Phone, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from './badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { cn } from './utils';
import type { SupplierItem } from '../../lib/types';

interface ContactInfoProps {
  contacts: SupplierItem['contacts'];
  className?: string;
  showValidation?: boolean;
  compact?: boolean;
}

export function ContactInfo({ 
  contacts, 
  className, 
  showValidation = true, 
  compact = false 
}: ContactInfoProps) {
  if (!contacts || contacts.length === 0) {
    return (
      <div className={cn("text-gray-400 text-sm", className)}>
        No contact information
      </div>
    );
  }

  const validContacts = contacts.filter(contact => contact.valid);
  const verifiedContacts = contacts.filter(contact => contact.verified);

  if (compact) {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        {validContacts.length > 0 && (
          <div className="flex items-center space-x-1">
            <Mail className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-600">
              {validContacts.filter(c => c.email).length}
            </span>
          </div>
        )}
        {validContacts.some(c => c.phone) && (
          <div className="flex items-center space-x-1">
            <Phone className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-600">
              {validContacts.filter(c => c.phone).length}
            </span>
          </div>
        )}
        {showValidation && verifiedContacts.length > 0 && (
          <CheckCircle className="w-3 h-3 text-green-500" />
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {contacts.map((contact, index) => (
        <ContactItem
          key={index}
          contact={contact}
          showValidation={showValidation}
        />
      ))}
    </div>
  );
}

interface ContactItemProps {
  contact: SupplierItem['contacts'][0];
  showValidation: boolean;
}

function ContactItem({ contact, showValidation }: ContactItemProps) {
  const getValidationIcon = () => {
    if (!showValidation) return null;
    
    if (contact.verified) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    } else if (contact.valid) {
      return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    } else {
      return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getValidationTooltip = () => {
    if (!showValidation) return '';
    
    if (contact.verified) {
      return 'Verified contact information';
    } else if (contact.valid) {
      return 'Valid but not verified';
    } else {
      return 'Invalid or unverified contact';
    }
  };

  return (
    <div className="flex items-start space-x-2 p-2 bg-gray-50 rounded-lg">
      <div className="flex-1 space-y-1">
        {/* Email */}
        {contact.email && (
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700">{contact.email}</span>
            {getValidationIcon() && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {getValidationIcon()}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getValidationTooltip()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}

        {/* Phone */}
        {contact.phone && (
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700">{contact.phone}</span>
            {getValidationIcon() && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {getValidationIcon()}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getValidationTooltip()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}

        {/* Address */}
        {contact.address && (
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
            <div className="text-sm text-gray-700">
              {contact.address.street && (
                <div>{contact.address.street}</div>
              )}
              <div>
                {[contact.address.city, contact.address.state, contact.address.postal_code]
                  .filter(Boolean)
                  .join(', ')}
              </div>
              {contact.address.country && (
                <div className="text-gray-500">{contact.address.country}</div>
              )}
            </div>
          </div>
        )}

        {/* Contact Type Badge */}
        <div className="flex items-center space-x-2">
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs",
              contact.type === 'sales' && "bg-blue-50 text-blue-700 border-blue-200",
              contact.type === 'support' && "bg-green-50 text-green-700 border-green-200",
              contact.type === 'general' && "bg-gray-50 text-gray-700 border-gray-200"
            )}
          >
            {contact.type}
          </Badge>
        </div>
      </div>
    </div>
  );
}

interface ContactSummaryProps {
  contacts: SupplierItem['contacts'];
  className?: string;
}

export function ContactSummary({ contacts, className }: ContactSummaryProps) {
  if (!contacts || contacts.length === 0) {
    return (
      <div className={cn("text-gray-400 text-sm", className)}>
        No contacts
      </div>
    );
  }

  const validContacts = contacts.filter(c => c.valid);
  const verifiedContacts = contacts.filter(c => c.verified);
  const hasEmail = validContacts.some(c => c.email);
  const hasPhone = validContacts.some(c => c.phone);
  const hasAddress = validContacts.some(c => c.address);

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {hasEmail && (
        <div className="flex items-center space-x-1">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Email</span>
        </div>
      )}
      {hasPhone && (
        <div className="flex items-center space-x-1">
          <Phone className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Phone</span>
        </div>
      )}
      {hasAddress && (
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Address</span>
        </div>
      )}
      
      {verifiedContacts.length > 0 && (
        <div className="flex items-center space-x-1">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600">
            {verifiedContacts.length} verified
          </span>
        </div>
      )}
    </div>
  );
}


