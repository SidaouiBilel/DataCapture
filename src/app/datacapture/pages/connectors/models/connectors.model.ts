import { ConnectorAWSS3SetupComponent } from "../modals/connector-awss3-setup/connector-awss3-setup.component";
import { ConnectorAzureBlobSetupComponent } from "../modals/connector-azure-blob-setup/connector-azure-blob-setup.component";
import { ConnectorSQLSetupComponent } from "../modals/connector-sqlsetup/connector-sqlsetup.component";

export const CONNECTOR_TYPES = [
    {type:'sqlserver', label:'SQL Server', setupComponenet: ConnectorSQLSetupComponent},
    {type:'postgres', label:'PostgresSQL', setupComponenet: ConnectorSQLSetupComponent},
    {type:'azure_blob_storage', label:'Azure Blob Storage', setupComponenet: ConnectorAzureBlobSetupComponent},
    {type:'amazon_storage', label:'AWS S3', setupComponenet: ConnectorAWSS3SetupComponent},
  ]