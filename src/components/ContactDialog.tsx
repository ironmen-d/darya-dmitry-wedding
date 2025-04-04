
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ContactDialogProps {
  type: 'whatsapp' | 'telegram';
  buttonText: string;
  dariaPhone: string;
  dmitryPhone: string;
}

export function ContactDialog({ type, buttonText, dariaPhone, dmitryPhone }: ContactDialogProps) {
  const getContactUrl = (phone: string) => {
    if (type === 'whatsapp') {
      return `https://wa.me/${phone.replace('+', '')}`;
    } else if (type === 'telegram') {
      return `https://t.me/${phone}`;
    }
    return '#';
  };

  const buttonColor = type === 'whatsapp' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600';
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`${buttonColor} text-white px-6 py-3 rounded-md transition-colors inline-flex items-center justify-center`}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-serif mb-4">С кем вы хотите связаться?</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center gap-6 mt-4">
          <a 
            href={getContactUrl(dariaPhone)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-wedding-terracotta hover:bg-wedding-terracotta/80 text-white px-6 py-3 rounded-md transition-colors inline-flex items-center justify-center"
          >
            Дарья
          </a>
          <a 
            href={getContactUrl(dmitryPhone)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-wedding-terracotta hover:bg-wedding-terracotta/80 text-white px-6 py-3 rounded-md transition-colors inline-flex items-center justify-center"
          >
            Дмитрий
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
