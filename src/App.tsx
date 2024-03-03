import "./App.css";
import MyLayout from "./layouts/MyLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function App() {
  return (
    <>
      <MyLayout>
        <MyLayout.Header>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </MyLayout.Header>
        <MyLayout.Body>
          <div></div>
        </MyLayout.Body>
        <MyLayout.Footer>
          <div></div>
        </MyLayout.Footer>
      </MyLayout>
    </>
  );
}

export default App;
