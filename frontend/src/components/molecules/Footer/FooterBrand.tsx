interface FooterBrandProps {
  title?: string;
  description?: string;
}

export function FooterBrand({
  title = "Koentjoro",
  description = "Portfolio & Reverse Hiring Platform",
}: FooterBrandProps) {
  return (
    <div className="col-span-1 md:col-span-1">
      <h3 className="text-2xl font-bold text-sky-400 mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
