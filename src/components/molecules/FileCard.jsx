import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ProgressBar from "@/components/atoms/ProgressBar";
import { formatFileSize, getFileIcon, isImageFile } from "@/utils/fileUtils";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";
import React from "react";

const FileCard = ({ 
  file, 
  onRemove, 
  onPreview,
  showActions = true 
}) => {
const handleCopyLink = async () => {
    const fileUrl = file.url_c || file.url;
    if (fileUrl) {
      try {
await navigator.clipboard.writeText(fileUrl);
        toast.success("Link copied to clipboard!");
      } catch (error) {
        toast.error("Failed to copy link");
      }
    }
  };
  
const handlePreview = () => {
    const fileType = file.type_c || file.type;
    if (isImageFile(fileType) && onPreview) {
      onPreview(file);
    }
  };
  
const getStatusColor = () => {
    const status = file.status_c || file.status;
    switch (status) {
      case "uploading": return "text-blue-400";
      case "completed": return "text-green-400";
      case "error": return "text-red-400";
      default: return "text-gray-400";
    }
  };
  
const getStatusIcon = () => {
    const status = file.status_c || file.status;
    switch (status) {
      case "uploading": return "Upload";
      case "completed": return "CheckCircle";
      case "error": return "AlertCircle";
      default: return "File";
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card variant="glass" padding="md" hover={false} className="group">
        <div className="flex items-start space-x-4">
          {/* File Icon/Thumbnail */}
          <div className="flex-shrink-0">
{(file.thumbnail_url_c || file.thumbnailUrl) ? (
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={file.thumbnail_url_c || file.thumbnailUrl}
                alt={file.name_c || file.name}
                className="w-12 h-12 rounded-lg object-cover cursor-pointer"
                onClick={handlePreview}
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 
                              rounded-lg flex items-center justify-center">
<ApperIcon 
                  name={getFileIcon(file.type_c || file.type)} 
                  className="w-6 h-6 text-primary-400"
                />
              </div>
            )}
          </div>
          
          {/* File Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
<h3 className="text-white font-medium truncate text-sm">
                  {file.name_c || file.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
<span className="text-xs text-gray-400">
                    {formatFileSize(file.size_c || file.size)}
                  </span>
                  <div className="w-1 h-1 bg-gray-600 rounded-full" />
                  <ApperIcon 
                    name={getStatusIcon()} 
                    className={cn("w-3 h-3", getStatusColor())} 
                  />
<span className={cn("text-xs capitalize", getStatusColor())}>
                    {file.status_c || file.status}
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              {showActions && (
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
{(file.status_c === "completed" || file.status === "completed") && (file.url_c || file.url) && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopyLink}
                        className="h-8 w-8"
                      >
                        <ApperIcon name="Copy" className="w-4 h-4" />
                      </Button>
                      
{isImageFile(file.type_c || file.type) && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handlePreview}
                          className="h-8 w-8"
                        >
                          <ApperIcon name="Eye" className="w-4 h-4" />
                        </Button>
                      )}
                    </>
                  )}
                  
                  {onRemove && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(file.id)}
                      className="h-8 w-8 text-red-400 hover:text-red-300"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
            
{/* Progress Bar */}
            {(file.status_c === "uploading" || file.status === "uploading") && (
              <div className="mt-3">
<ProgressBar
                  value={file.progress_c || file.progress || 0}
                  showLabel={false}
                  animated={true}
                  size="sm"
                />
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FileCard;