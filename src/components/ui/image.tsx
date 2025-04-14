
import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string
  fallbackSrc?: string
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, fallbackSrc = "/placeholder.svg", onError, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [hasError, setHasError] = React.useState(false)

    const handleLoad = () => {
      setIsLoading(false)
    }

    const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setHasError(true)
      setIsLoading(false)
      if (onError) {
        onError(event)
      }
    }

    if (hasError) {
      return (
        <img
          ref={ref}
          src={fallbackSrc}
          alt={alt}
          className={cn("object-contain", className)}
        />
      )
    }

    return (
      <div className="relative">
        {isLoading && (
          <Skeleton 
            className={cn(
              "absolute inset-0",
              className
            )} 
          />
        )}
        <img
          ref={ref}
          alt={alt}
          className={cn(
            "object-contain transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      </div>
    )
  }
)
Image.displayName = "Image"

export default Image

