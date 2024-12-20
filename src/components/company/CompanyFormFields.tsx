import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CompanyFormFields = () => {
  return (
    <>
      <div>
        <Label htmlFor="name">Company Name *</Label>
        <Input id="name" name="name" required />
      </div>

      <div>
        <Label htmlFor="role">Company Role *</Label>
        <Input id="role" name="role" placeholder="e.g., Freight Forwarder" required />
      </div>

      <div>
        <Label htmlFor="bio">Company Description</Label>
        <Textarea id="bio" name="bio" />
      </div>

      <div>
        <Label htmlFor="contact_person">Contact Person *</Label>
        <Input id="contact_person" name="contact_person" required />
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input type="email" id="email" name="email" required />
      </div>

      <div>
        <Label htmlFor="telephone">Telephone</Label>
        <Input id="telephone" name="telephone" />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" />
      </div>

      <div>
        <Label htmlFor="country">Country *</Label>
        <Input id="country" name="country" required />
      </div>
    </>
  );
};

export default CompanyFormFields;