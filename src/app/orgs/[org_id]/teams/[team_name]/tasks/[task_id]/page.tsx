import dynamic from "next/dynamic";

const ExcalidrawDynamicComponent = dynamic(
  async () => (await import("@/components/custom/Excalidraw")).default,
  {
    ssr: false,
  }
);

const page = () => {
  return <ExcalidrawDynamicComponent />;
};

export default page;
