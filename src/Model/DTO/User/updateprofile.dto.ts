export class UpdateProfileDto {
  firstName: string;
  middleName: string;
  surName: string;
  oldPassword: string;
  newPassword: string;
  avatar: File;
}
