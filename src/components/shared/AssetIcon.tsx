type AssetSource = string | { src: string };

type AssetIconProps = {
  src: AssetSource;
  alt?: string;
  className?: string;
};

export default function AssetIcon({
  src,
  alt = "",
  className,
}: AssetIconProps) {
  const imageSrc = typeof src === "string" ? src : src.src;

  return (
    // These are SVG assets used as icons, so a plain <img> keeps the output simple and stable.
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={imageSrc}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      className={className}
      draggable={false}
    />
  );
}
