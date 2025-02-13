import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'

interface UploadDropzoneProps {
  endpoint: string
  onClientUploadComplete?: (res: any) => void
  onUploadError?: (error: Error) => void
}

export function UploadDropzone({ 
  endpoint, 
  onClientUploadComplete, 
  onUploadError 
}: UploadDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload here
    console.log(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div 
      {...getRootProps()} 
      className="flex flex-col items-center justify-center h-full text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      <Upload className="h-10 w-10 text-muted-foreground mb-4" />
      {isDragActive ? (
        <p className="text-sm text-muted-foreground">Drop the file here</p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Drag & drop an image here,<br />or click to select
        </p>
      )}
    </div>
  )
} 