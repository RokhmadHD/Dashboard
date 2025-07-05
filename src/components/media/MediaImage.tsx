import { useState } from "react";
import Image from "next/image";
function MediaImage({
    src,
    alt,
    width,
    height,
    className,
}: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}) {
    const [imgSrc, setImgSrc] = useState(src);
    const fallback = '/images/error/404.svg'; // Place a fallback image in your public folder

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            onError={() => setImgSrc(fallback)}
        />
    );
}

export default MediaImage;