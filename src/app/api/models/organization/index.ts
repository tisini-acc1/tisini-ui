import mongoose from "mongoose";
import {
  TisiniOrganizationDocumentInterface,
  TisiniOrganizationModelInterface,
} from "./organization.interface";

const OrganizationSchema =
  new mongoose.Schema<TisiniOrganizationDocumentInterface>(
    {
      organization_name: {
        type: String,
        required: [true, "Please provide an organization name"],
        trim: true,
      },
      org_logo: {
        type: String,
        required: false,
        trim: true,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

OrganizationSchema.statics.build = (
  attr: TisiniOrganizationDocumentInterface
) => {
  return new OrganizationModel(attr);
};

const OrganizationModel =
  mongoose.models.Organization ||
  mongoose.model<
    TisiniOrganizationDocumentInterface,
    TisiniOrganizationModelInterface
  >("Organization", OrganizationSchema);

export default OrganizationModel;
