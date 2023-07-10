import OrganizationModel from "../../models/organization";
import { TisiniOrganizationInterface } from "../../models/organization/organization.interface";
import dbConnect from "../../mongodb";
import { TisiniServerException } from "../../utils/TisiniServerException";
import { HttpStatus } from "../../utils/http-status.types";

export class CreateOrganizationDto implements TisiniOrganizationInterface {
  constructor(
    public organization_name: string,
    public org_logo?: string | null,
    public description?: string | null
  ) {}

  static async fromJson(org: TisiniOrganizationInterface) {
    if (!org.organization_name) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Organization name is required"],
        {
          key: "organization_name",
        },
        "Organization name is required"
      );
    }
    if (org.organization_name) {
      await dbConnect();
      const existingOrganization = await OrganizationModel.findOne({
        organization_name: org.organization_name,
      });
      if (existingOrganization) {
        throw new TisiniServerException(
          HttpStatus.CONFLICT,
          ["Organization already exists"],
          {
            key: "organization_name",
          },
          "Organization already exists"
        );
      }
    }
    if (!org.description) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Description is required"],
        {
          key: "description",
        },
        "Description is required"
      );
    }
    if (org.org_logo && typeof org.org_logo !== "string") {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Organization logo must be a string"],
        {
          key: "org_logo",
        },
        "Organization logo must be a string"
      );
    }

    return new CreateOrganizationDto(
      org.organization_name,
      org.org_logo,
      org.description
    );
  }
}
