
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle, UploadCloud } from 'lucide-react';
import { storageService } from '@/services/storageService';
import { toast } from 'sonner';

interface FileUploadProps {
    onUploadComplete: (url: string) => void;
    label?: string;
    accept?: string;
}

export function FileUpload({ onUploadComplete, label = "Upload File", accept = "image/*" }: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setSuccess(false);

        try {
            const url = await storageService.uploadPaymentProof(file);
            onUploadComplete(url);
            setSuccess(true);
            toast.success("File uploaded successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload file. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file-upload" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
            </Label>
            <div className="flex items-center gap-2">
                <Input
                    id="file-upload"
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    disabled={uploading || success}
                    className="cursor-pointer"
                />
                {uploading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                {success && <CheckCircle className="h-4 w-4 text-green-500" />}
            </div>
            {success && <p className="text-xs text-green-600 mt-1">Upload complete!</p>}
        </div>
    );
}
