import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = ({ title }: { title: string }) => {
  return (
    <header className="flex items-center mb-2">
      <SidebarTrigger className="px-6" />
      <nav className=" w-full border-l px-2 border-l-black">
        <h2>{title}</h2>
      </nav>
    </header>
  );
};

export default Header;
