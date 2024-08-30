import Notifications from "@/components/ui/notification";
import { getSession } from "@/lib/session";

const page = async () => {
  const data = await getSession();

  return <Notifications user={data} />;
};

export default page;
