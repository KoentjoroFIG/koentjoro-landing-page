interface FooterCopyrightProps {
  year?: number;
  companyName?: string;
}

export function FooterCopyright({
  year = new Date().getFullYear(),
  companyName = "Koentjoro",
}: FooterCopyrightProps) {
  return (
    <div className="border-t border-gray-800 pt-6 md:pt-8">
      <p className="text-center text-gray-400 text-sm md:text-base">
        &copy; {year} {companyName}. All rights reserved.
      </p>
    </div>
  );
}
