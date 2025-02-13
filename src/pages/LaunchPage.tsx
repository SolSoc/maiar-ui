import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus, Rocket } from "lucide-react"
import { UploadDropzone } from "@/components/ui/upload-dropzone"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

function LaunchPage() {
  const [knowledgeInputs, setKnowledgeInputs] = useState<string[]>([''])
  const [peopleInputs, setPeopleInputs] = useState<string[]>([''])
  const [styleInputs, setStyleInputs] = useState<string[]>([''])

  const addInput = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => {
      if (prev.length < 10) {
        return [...prev, '']
      }
      return prev
    })
  }

  const removeInput = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => {
      if (prev.length > 1) {
        return prev.filter((_, i) => i !== index)
      }
      return prev
    })
  }

  const handleInputChange = (
    index: number, 
    value: string, 
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(prev => {
      const newInputs = [...prev]
      newInputs[index] = value
      return newInputs
    })
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Launch Agent</h1>
        
        <div className="space-y-8">
          {/* Top Card - Image and Basic Info */}
          <Card className="p-6 border">
            <div className="flex flex-col md:flex-row gap-8 h-[300px]">
              {/* Left Column - Image Upload */}
              <div className="w-full md:w-64">
                <div className="h-full flex flex-col">
                  <Label className="mb-3">Agent Image</Label>
                  <div className="flex-1 border-2 border-dashed rounded-lg p-4 hover:border-primary/50 transition-colors">
                    <UploadDropzone 
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        console.log("Files: ", res)
                      }}
                      onUploadError={(error: Error) => {
                        console.error("Error: ", error)
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Basic Info */}
              <div className="flex-1">
                <div className="h-full flex flex-col">
                  <div className="space-y-3 mb-4">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="CubieCubed" />
                  </div>
                  
                  <div className="flex-1 flex flex-col space-y-3">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="First social agent built using $MAIAR"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Knowledge and People Card */}
          <Card className="p-6 border">
            <div className="space-y-8">
              {/* Knowledge Section */}
              <div className="space-y-3">
                <Label>Knowledge</Label>
                {knowledgeInputs.map((input, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => handleInputChange(index, e.target.value, setKnowledgeInputs)}
                      placeholder={`Knowledge ${index + 1}`}
                    />
                    {index === knowledgeInputs.length - 1 && knowledgeInputs.length < 10 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => addInput(setKnowledgeInputs)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                    {knowledgeInputs.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeInput(index, setKnowledgeInputs)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* People Section */}
              <div className="space-y-3">
                <Label>People</Label>
                {peopleInputs.map((input, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => handleInputChange(index, e.target.value, setPeopleInputs)}
                      placeholder={`Person ${index + 1}`}
                    />
                    {index === peopleInputs.length - 1 && peopleInputs.length < 10 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => addInput(setPeopleInputs)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                    {peopleInputs.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeInput(index, setPeopleInputs)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Style Card */}
          <Card className="p-6 border">
            <div className="space-y-3">
              <Label>Style</Label>
              {styleInputs.map((input, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => handleInputChange(index, e.target.value, setStyleInputs)}
                    placeholder="Don't use hashtags please"
                  />
                  {index === styleInputs.length - 1 && styleInputs.length < 10 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => addInput(setStyleInputs)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                  {styleInputs.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeInput(index, setStyleInputs)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Launch Button */}
          <div className="flex justify-center pt-4">
            <Button 
              size="lg"
              className={cn(
                "bg-[#00ff9d] hover:bg-[#00ff9d]/90 text-black font-semibold",
                "px-8 py-6 text-lg shadow-lg",
                "flex items-center gap-2"
              )}
            >
              <Rocket className="h-5 w-5" />
              Launch
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LaunchPage 