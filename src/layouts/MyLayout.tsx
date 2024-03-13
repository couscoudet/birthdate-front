// import { getVhUnit } from "@/utils/intrinsic_layout_dvh_mnmt";
// import { useEffect, useState } from "react";

type propType = {
  children: React.ReactNode;
};

function MyLayout({ children }: propType) {
  // const [dvh, setDvh] = useState<"dvh" | "vh">("dvh");
  // useEffect(() => {
  //   setDvh(getVhUnit());
  // }, []);
  return (
    <div
      className={`grid grid-rows-6 grid-flow-col grid-cols-12 gap-2 h-[calc(100vh-60px)] text-white`}
    >
      {children}
    </div>
  );
}

MyLayout.Header = (props: propType) => (
  <div className="col-start-2 col-span-10 md:col-start-4 md:col-span-6">
    {props.children}
  </div>
);
MyLayout.Body = (props: propType) => (
  <div className="col-start-2 col-span-10 md:col-start-4 md:col-span-6 row-span-4 h-full">
    {props.children}
  </div>
);
MyLayout.Footer = (props: propType) => (
  <div className="col-start-2 col-span-10 md:col-start-4 md:col-span-6 flex justify-between items-center">
    {props.children}
  </div>
);

export default MyLayout;
