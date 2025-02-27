import NecessitiesForm from "@/components/features/event/necessities/necessities-form";

export default function page() {
  return (
    <section className="grid gap-6">
      <div className="grid gap-4">
        {/* TODO: use Breadcrumb component after merge timeline PR  */}
        <p>Breadcrumb</p>
        <div className="grid gap-2">
          <h1 className="text-xl font-bold">Things to bring</h1>
          <p className="text-sm text-textSub">
            Create a list of items for your guests to bring to the event.
          </p>
        </div>
      </div>
      <NecessitiesForm />
    </section>
  );
}
