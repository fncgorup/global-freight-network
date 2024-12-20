import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { ProfileForm } from "@/components/profile/ProfileForm";

const UserProfile = () => {
  const {
    profile,
    isEditing,
    formData,
    setIsEditing,
    handleSubmit,
    handleChange,
    resetForm,
  } = useProfile();

  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Profile Settings</h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      <ProfileForm
        formData={formData}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onCancel={resetForm}
      />
    </div>
  );
};

export default UserProfile;