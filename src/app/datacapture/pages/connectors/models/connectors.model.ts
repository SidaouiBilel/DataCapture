import { ConnectorAWSS3SetupComponent } from "../modals/connector-awss3-setup/connector-awss3-setup.component";
import { ConnectorAzureBlobSetupComponent } from "../modals/connector-azure-blob-setup/connector-azure-blob-setup.component";
import { ConnectorSQLSetupComponent } from "../modals/connector-sqlsetup/connector-sqlsetup.component";

export const CONNECTOR_DEF_SQL = {type:'sqlserver', label:'SQL Server', svg:'assets/icons/sqlserver.svg', svgWhite:'assets/icons/white/sqlserver.svg',  setupComponenet: ConnectorSQLSetupComponent}
export const CONNECTOR_DEF_POSTGRES = {type:'postgres', label:'PostgreSQL', svg:'assets/icons/postgres.svg', svgWhite:'assets/icons/white/postgres.svg',  setupComponenet: ConnectorSQLSetupComponent}
export const CONNECTOR_DEF_BLOB_STORAGE = {type:'azure_blob_storage', label:'Azure Blob Storage', svgWhite:'assets/icons/white/storage-blob.svg', svg:'assets/icons/storage-blob.svg',  setupComponenet: ConnectorAzureBlobSetupComponent}
export const CONNECTOR_DEF_AWS_S3 = {type:'amazon_storage', label:'AWS S3', svg:'assets/icons/aws.svg', svgWhite:'assets/icons/white/aws.svg',  setupComponenet: ConnectorAWSS3SetupComponent}

export const CONNECTOR_TYPES = [
    CONNECTOR_DEF_SQL,
    CONNECTOR_DEF_POSTGRES,
    CONNECTOR_DEF_BLOB_STORAGE,
    CONNECTOR_DEF_AWS_S3,
  ]