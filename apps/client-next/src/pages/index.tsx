import { Button } from "@libs/ui";

export const Home = () => {
  return (
    <div className="flex w-[200px] flex-col gap-4 p-8">
      <Button variant="solid">Click me!</Button>
      <Button variant="outlinedPrimary">Click me!</Button>
      <Button variant="outlinedAssertive">Click me!</Button>
      <Button variant="textPrimary">Click me!</Button>
      <Button variant="textAssertive">Click me!</Button>
      <Button variant="solid" size="small">
        Click me!
      </Button>
      <Button variant="solid" size="medium">
        Click me!
      </Button>
    </div>
  );
};

export default Home;
