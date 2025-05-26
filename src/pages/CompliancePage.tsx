
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-full">
    <h1 className="text-3xl font-semibold text-muted-foreground">{title} - Coming Soon</h1>
  </div>
);
const CompliancePage = () => <PlaceholderPage title="Compliance & Documentation" />;
export default CompliancePage;
