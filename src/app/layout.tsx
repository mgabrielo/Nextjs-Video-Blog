import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/shared/navigation/Navigation";
import CurrentUserProvider from "@/context/CurrentUserContext";
import getCurrentUser from "@/actions/getCurrentUser";
import ChannelModalProvider from "@/context/ChannelModalContext";
import CreateChannelModal from "@/components/shared/modals/CreateChannelModal";
import { Toaster } from "react-hot-toast";
import CurrentChannelProvider from "@/context/CurrentChannelContext";
import getCurrentChannel from "@/actions/getCurrentChannel";
import UploadVideoModalProvider from "@/context/UploadVideoModalContext";
import SidebarProvider from "@/context/SideBarContext";
import getCurrentSubScriptions from "@/actions/getCurrentSubScriptions";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Next Js Video Blog",
  description: "Social Video Blog",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const currentChannels = await getCurrentChannel();
  const subscriptions = await getCurrentSubScriptions();

  return (
    <html lang="en">
      <body className={roboto.className}>
        <CurrentUserProvider user={currentUser}>
          <ChannelModalProvider>
            <CurrentChannelProvider channel={currentChannels}>
              <Toaster toastOptions={{ position: "top-center" }} />
              <CreateChannelModal />
              <UploadVideoModalProvider>
                <SidebarProvider>
                  <Navigation subscriptions={subscriptions} />
                  <div className="pt-16">{children}</div>
                </SidebarProvider>
              </UploadVideoModalProvider>
            </CurrentChannelProvider>
          </ChannelModalProvider>
        </CurrentUserProvider>
      </body>
    </html>
  );
}
