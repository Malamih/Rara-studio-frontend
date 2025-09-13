import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Form = () => {
  return (
    <form action="">
      <div className="flex flex-wrap gap-12 mb-12">
        <div className="input grid gap-2 w-full min-w-sm flex-[1] max-lg:min-w-full">
          <Label className="font-medium text-sm leading-5">First Name</Label>
          <Input type="text" />
        </div>
        <div className="input grid gap-2 w-full min-w-sm flex-[1] max-lg:min-w-full">
          <Label className="font-medium text-sm leading-5">Last Name</Label>
          <Input type="text" />
        </div>
      </div>
      <div className="flex flex-wrap gap-12 mb-36">
        <div className="input grid gap-2 w-full min-w-sm flex-[1] max-lg:min-w-full">
          <Label className="font-medium text-sm leading-5">Eamil</Label>
          <Input type="email" />
        </div>
        <div className="input grid gap-2 w-full min-w-sm flex-[1] max-lg:min-w-full">
          <Label className="font-medium text-sm leading-5">Phone Number</Label>
          <Input type="text" />
        </div>
      </div>
      <div className="message mt-16">
        <Label className="font-medium text-sm leading-5">Message</Label>
        <textarea
          placeholder="Write your message"
          className="border-b border-b-input px-3 py-2 w-full resize-y min-h-[100px] max-h-[200px] outline-none"
        ></textarea>
      </div>
      <div className="btn flex justify-end mt-12">
        <Button className="bg-[#A61B3B] px-12 !py-5 text-base font-medium">
          Send Message
        </Button>
      </div>
    </form>
  );
};
