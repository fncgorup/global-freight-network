import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileFormSchema } from "@/components/profile/schema";

const UserProfile = () => {
  const { profile, isLoading, updateProfile } = useProfile();

  if (!profile) return null;

  const handleSubmit = async (data: ProfileFormSchema) => {
    await updateProfile(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Profile Settings</h2>
      </div>

      <ProfileForm
        onSubmit={handleSubmit}
        defaultValues={profile}
        isLoading={isLoading}
      />
    </div>
  );
};

export default UserProfile;