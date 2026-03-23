import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  _ByteArray: { input: any; output: any; }
  _Date: { input: any; output: any; }
  _DateTime: { input: any; output: any; }
  _Float4: { input: any; output: any; }
  _OffsetDateTime: { input: any; output: any; }
  _Time: { input: any; output: any; }
  /** An arbitrary precision signed decimal */
  BigDecimal: { input: any; output: any; }
  /** An 8-bit signed integer */
  Byte: { input: any; output: any; }
  /** A UTF-16 code unit; a character on Unicode's BMP */
  Char: { input: any; output: any; }
  /** A 64-bit signed integer */
  Long: { input: any; output: any; }
  /** A 16-bit signed integer */
  Short: { input: any; output: any; }
};

export type _AddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  flatNo?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type _Calculation = {
  __typename?: '_Calculation';
  bigDecimal?: Maybe<Scalars['BigDecimal']['output']>;
  boolean?: Maybe<Scalars['Boolean']['output']>;
  byte?: Maybe<Scalars['Byte']['output']>;
  byteArray?: Maybe<Scalars['_ByteArray']['output']>;
  char?: Maybe<Scalars['Char']['output']>;
  date?: Maybe<Scalars['_Date']['output']>;
  dateTime?: Maybe<Scalars['_DateTime']['output']>;
  double?: Maybe<Scalars['Float']['output']>;
  float?: Maybe<Scalars['_Float4']['output']>;
  int?: Maybe<Scalars['Int']['output']>;
  long?: Maybe<Scalars['Long']['output']>;
  offsetDateTime?: Maybe<Scalars['_OffsetDateTime']['output']>;
  short?: Maybe<Scalars['Short']['output']>;
  string?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['_Time']['output']>;
};


export type _CalculationBigDecimalArgs = {
  expr: Scalars['String']['input'];
};


export type _CalculationBooleanArgs = {
  expr: Scalars['String']['input'];
};


export type _CalculationByteArgs = {
  expr: Scalars['String']['input'];
};


export type _CalculationByteArrayArgs = {
  expr: Scalars['String']['input'];
};


export type _CalculationCharArgs = {
  expr: Scalars['String']['input'];
};


export type _CalculationDateArgs = {
  expr: Scalars['String']['input'];
};


export type _CalculationDateTimeArgs = {
  expr: Scalars['String']['input'];
};


export type _CalculationDoubleArgs = {
  expr: Scalars['String']['input'];
};


export type _CalculationFloatArgs = {
  expr: Scalars['String']['input'];
};


export type _CalculationIntArgs = {
  expr: Scalars['String']['input'];
};


export type _CalculationLongArgs = {
  expr: Scalars['String']['input'];
};


export type _CalculationOffsetDateTimeArgs = {
  expr: Scalars['String']['input'];
};


export type _CalculationShortArgs = {
  expr: Scalars['String']['input'];
};


export type _CalculationStringArgs = {
  expr: Scalars['String']['input'];
};


export type _CalculationTimeArgs = {
  expr: Scalars['String']['input'];
};

export type _CompareClinicDoctorAvailabilityInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  beginDate?: InputMaybe<Scalars['_DateTime']['input']>;
  endDate?: InputMaybe<Scalars['_DateTime']['input']>;
};

export type _CompareClinicDoctorTableInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  beginDate?: InputMaybe<Scalars['_DateTime']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['_DateTime']['input']>;
};

export type _CompareClinicInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type _CompareClinicOfficeInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  officeNum?: InputMaybe<Scalars['String']['input']>;
};

export type _CompareCustomerInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  insuranceNum?: InputMaybe<Scalars['String']['input']>;
};

export type _CompareDoctorTypeInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  descr?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type _ComparePersonInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  birthDate?: InputMaybe<Scalars['_Date']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<_En_Sex>;
};

export type _CreateClinicCustomerInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  clinic: Scalars['ID']['input'];
  customer?: InputMaybe<_SingleReferenceInput>;
};

export type _CreateClinicDoctorAvailabilityInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  beginDate: Scalars['_DateTime']['input'];
  clinicDoctor: Scalars['ID']['input'];
  clinicOffice: Scalars['ID']['input'];
  endDate: Scalars['_DateTime']['input'];
};

export type _CreateClinicDoctorInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  clinic: Scalars['ID']['input'];
  doctor?: InputMaybe<_SingleReferenceInput>;
};

export type _CreateClinicDoctorTableInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  beginDate: Scalars['_DateTime']['input'];
  clinicCustomer: Scalars['ID']['input'];
  clinicDoctorAvailability: Scalars['ID']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['_DateTime']['input'];
};

export type _CreateClinicInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  address?: InputMaybe<_AddressInput>;
  name: Scalars['String']['input'];
};

export type _CreateClinicOfficeInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  clinic: Scalars['ID']['input'];
  officeNum: Scalars['String']['input'];
};

export type _CreateCustomerInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  insuranceNum: Scalars['String']['input'];
  person: _SingleReferenceInput;
};

export type _CreateDoctorInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  doctorType: Scalars['ID']['input'];
  person: _SingleReferenceInput;
};

export type _CreateDoctorTypeInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  descr?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type _CreatePersonInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  birthDate?: InputMaybe<Scalars['_Date']['input']>;
  firstName: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  lastName: Scalars['String']['input'];
  sex: _En_Sex;
};

export type _DeleteManyClinicCustomerInput = {
  id: Scalars['String']['input'];
};

export type _DeleteManyClinicDoctorAvailabilityInput = {
  compare?: InputMaybe<_CompareClinicDoctorAvailabilityInput>;
  id: Scalars['String']['input'];
};

export type _DeleteManyClinicDoctorInput = {
  id: Scalars['String']['input'];
};

export type _DeleteManyClinicDoctorTableInput = {
  compare?: InputMaybe<_CompareClinicDoctorTableInput>;
  id: Scalars['String']['input'];
};

export type _DeleteManyClinicInput = {
  compare?: InputMaybe<_CompareClinicInput>;
  id: Scalars['String']['input'];
};

export type _DeleteManyClinicOfficeInput = {
  compare?: InputMaybe<_CompareClinicOfficeInput>;
  id: Scalars['String']['input'];
};

export type _DeleteManyCustomerInput = {
  compare?: InputMaybe<_CompareCustomerInput>;
  id: Scalars['String']['input'];
};

export type _DeleteManyDoctorInput = {
  id: Scalars['String']['input'];
};

export type _DeleteManyDoctorTypeInput = {
  compare?: InputMaybe<_CompareDoctorTypeInput>;
  id: Scalars['String']['input'];
};

export type _DeleteManyPersonInput = {
  compare?: InputMaybe<_ComparePersonInput>;
  id: Scalars['String']['input'];
};

export enum _DependsOnDependencyByGet {
  Exists = 'EXISTS',
  NotExists = 'NOT_EXISTS'
}

export enum _DependsOnDependencyByUpdateOrCreate {
  Created = 'CREATED',
  NotCreated = 'NOT_CREATED'
}

export type _DictionaryPacket = {
  __typename?: '_DictionaryPacket';
  deleteDoctorType?: Maybe<Scalars['String']['output']>;
  deleteManyDoctorType?: Maybe<Scalars['String']['output']>;
  getDoctorType?: Maybe<DoctorType>;
  updateOrCreateDoctorType?: Maybe<_UpdateOrCreateDoctorTypeResponse>;
  updateOrCreateManyDoctorType?: Maybe<Array<Maybe<_UpdateOrCreateManyResponse>>>;
};


export type _DictionaryPacketDeleteDoctorTypeArgs = {
  compare?: InputMaybe<_CompareDoctorTypeInput>;
  id: Scalars['ID']['input'];
};


export type _DictionaryPacketDeleteManyDoctorTypeArgs = {
  input: Array<_DeleteManyDoctorTypeInput>;
};


export type _DictionaryPacketGetDoctorTypeArgs = {
  failOnEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  lock?: _GetLockMode;
};


export type _DictionaryPacketUpdateOrCreateDoctorTypeArgs = {
  exist?: InputMaybe<_ExistDoctorTypeInput>;
  input: _CreateDoctorTypeInput;
};


export type _DictionaryPacketUpdateOrCreateManyDoctorTypeArgs = {
  input: Array<_UpdateOrCreateManyDoctorTypeInput>;
};

export type _E_Clinic = _Entity & Clinic & {
  __typename?: '_E_Clinic';
  _calc: _Calculation;
  address: _G_Address;
  aggVersion: Scalars['Long']['output'];
  clinicCustomerList: _Ec_ClinicCustomer;
  clinicDoctorList: _Ec_ClinicDoctor;
  clinicOfficeList: _Ec_ClinicOffice;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  sys_ver?: Maybe<Scalars['Long']['output']>;
  type: Scalars['String']['output'];
};


export type _E_ClinicClinicCustomerListArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _E_ClinicClinicDoctorListArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _E_ClinicClinicOfficeListArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};

export type _E_ClinicCustomer = _Entity & ClinicCustomer & {
  __typename?: '_E_ClinicCustomer';
  _calc: _Calculation;
  aggregateRoot?: Maybe<Clinic>;
  aggVersion: Scalars['Long']['output'];
  clinic: Clinic;
  clinicCustomerTableLost: _Ec_ClinicDoctorTable;
  customer: _G_CustomerReference;
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
};


export type _E_ClinicCustomerAggregateRootArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type _E_ClinicCustomerClinicArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type _E_ClinicCustomerClinicCustomerTableLostArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};

export type _E_ClinicDoctor = _Entity & ClinicDoctor & {
  __typename?: '_E_ClinicDoctor';
  _calc: _Calculation;
  aggregateRoot?: Maybe<Clinic>;
  aggVersion: Scalars['Long']['output'];
  clinic: Clinic;
  clinicDoctorAvailabilityList: _Ec_ClinicDoctorAvailability;
  doctor: _G_DoctorReference;
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
};


export type _E_ClinicDoctorAggregateRootArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type _E_ClinicDoctorClinicArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type _E_ClinicDoctorClinicDoctorAvailabilityListArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};

export type _E_ClinicDoctorAvailability = _Entity & ClinicDoctorAvailability & {
  __typename?: '_E_ClinicDoctorAvailability';
  _calc: _Calculation;
  aggregateRoot?: Maybe<Clinic>;
  aggVersion: Scalars['Long']['output'];
  beginDate: Scalars['_DateTime']['output'];
  clinicDoctor: ClinicDoctor;
  clinicDoctorTableList: _Ec_ClinicDoctorTable;
  clinicOffice: ClinicOffice;
  endDate: Scalars['_DateTime']['output'];
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
};


export type _E_ClinicDoctorAvailabilityAggregateRootArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type _E_ClinicDoctorAvailabilityClinicDoctorArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type _E_ClinicDoctorAvailabilityClinicDoctorTableListArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _E_ClinicDoctorAvailabilityClinicOfficeArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};

export type _E_ClinicDoctorTable = _Entity & ClinicDoctorTable & {
  __typename?: '_E_ClinicDoctorTable';
  _calc: _Calculation;
  aggregateRoot?: Maybe<Clinic>;
  aggVersion: Scalars['Long']['output'];
  beginDate: Scalars['_DateTime']['output'];
  clinicCustomer: ClinicCustomer;
  clinicDoctorAvailability: ClinicDoctorAvailability;
  comment?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['_DateTime']['output'];
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
};


export type _E_ClinicDoctorTableAggregateRootArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type _E_ClinicDoctorTableClinicCustomerArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type _E_ClinicDoctorTableClinicDoctorAvailabilityArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};

export type _E_ClinicOffice = _Entity & ClinicOffice & {
  __typename?: '_E_ClinicOffice';
  _calc: _Calculation;
  aggregateRoot?: Maybe<Clinic>;
  aggVersion: Scalars['Long']['output'];
  clinic: Clinic;
  clinicOfficeAvailabilityList: _Ec_ClinicDoctorAvailability;
  id: Scalars['ID']['output'];
  officeNum: Scalars['String']['output'];
  type: Scalars['String']['output'];
};


export type _E_ClinicOfficeAggregateRootArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type _E_ClinicOfficeClinicArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type _E_ClinicOfficeClinicOfficeAvailabilityListArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};

export type _E_Customer = _Entity & Customer & {
  __typename?: '_E_Customer';
  _calc: _Calculation;
  aggVersion: Scalars['Long']['output'];
  id: Scalars['ID']['output'];
  insuranceNum: Scalars['String']['output'];
  person: _G_PersonReference;
  sys_ver?: Maybe<Scalars['Long']['output']>;
  type: Scalars['String']['output'];
};

export type _E_Doctor = _Entity & Doctor & {
  __typename?: '_E_Doctor';
  _calc: _Calculation;
  aggVersion: Scalars['Long']['output'];
  doctorType: DoctorType;
  id: Scalars['ID']['output'];
  person: _G_PersonReference;
  sys_ver?: Maybe<Scalars['Long']['output']>;
  type: Scalars['String']['output'];
};


export type _E_DoctorDoctorTypeArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};

export type _E_DoctorType = _Entity & DoctorType & {
  __typename?: '_E_DoctorType';
  _calc: _Calculation;
  aggregateRoot?: Maybe<RootDictionary>;
  descr?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  sys_ver?: Maybe<Scalars['Long']['output']>;
  type: Scalars['String']['output'];
};


export type _E_DoctorTypeAggregateRootArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};

export type _E_Person = _Entity & Person & {
  __typename?: '_E_Person';
  _calc: _Calculation;
  aggVersion: Scalars['Long']['output'];
  birthDate?: Maybe<Scalars['_Date']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  sex: _En_Sex;
  sys_ver?: Maybe<Scalars['Long']['output']>;
  type: Scalars['String']['output'];
};

export type _E_RootDictionary = _Entity & RootDictionary & {
  __typename?: '_E_RootDictionary';
  _calc: _Calculation;
  id: Scalars['ID']['output'];
  sys_ver?: Maybe<Scalars['Long']['output']>;
  type: Scalars['String']['output'];
};

export type _E_SysCheckSelect = _Entity & SysCheckSelect & {
  __typename?: '_E_SysCheckSelect';
  _calc: _Calculation;
  aggVersion: Scalars['Long']['output'];
  beforeCommitEnable?: Maybe<Scalars['Boolean']['output']>;
  beforeOperationDisable?: Maybe<Scalars['Boolean']['output']>;
  conditionValue?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  operation: SysOperation;
  orderValue?: Maybe<Scalars['Int']['output']>;
  typeName?: Maybe<Scalars['String']['output']>;
};


export type _E_SysCheckSelectOperationArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};

export type _E_SysOperation = _Entity & SysOperation & {
  __typename?: '_E_SysOperation';
  _calc: _Calculation;
  aggVersion: Scalars['Long']['output'];
  allowEmptyChecks?: Maybe<Scalars['Boolean']['output']>;
  audit?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['String']['output']>;
  bypassBLRules?: Maybe<Scalars['Boolean']['output']>;
  checkForAnyPrivilege?: Maybe<Scalars['String']['output']>;
  checkSelects: _Ec_SysCheckSelect;
  description?: Maybe<Scalars['String']['output']>;
  disableJwtVerification?: Maybe<Scalars['Boolean']['output']>;
  doc?: Maybe<Scalars['String']['output']>;
  hashValue?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  paramAdditions: _Ec_SysParamAddition;
  pathConditions?: Maybe<Scalars['String']['output']>;
  sqlQueryLimit?: Maybe<Scalars['Int']['output']>;
  target?: Maybe<_En_SysOperationTarget>;
};


export type _E_SysOperationCheckSelectsArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _E_SysOperationParamAdditionsArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};

export type _E_SysParamAddition = _Entity & SysParamAddition & {
  __typename?: '_E_SysParamAddition';
  _calc: _Calculation;
  aggVersion: Scalars['Long']['output'];
  id: Scalars['ID']['output'];
  operation: SysOperation;
  paramAddition?: Maybe<Scalars['String']['output']>;
  paramName?: Maybe<Scalars['String']['output']>;
};


export type _E_SysParamAdditionOperationArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};

export type _E_SysRequestControl = _Entity & SysRequestControl & {
  __typename?: '_E_SysRequestControl';
  _calc: _Calculation;
  aggVersion: Scalars['Long']['output'];
  approverLogin?: Maybe<Scalars['String']['output']>;
  approverName?: Maybe<Scalars['String']['output']>;
  bypassBLRules?: Maybe<Scalars['Boolean']['output']>;
  creationTime: Scalars['_OffsetDateTime']['output'];
  decisionTime?: Maybe<Scalars['_OffsetDateTime']['output']>;
  errors?: Maybe<Scalars['String']['output']>;
  executionTime?: Maybe<Scalars['_OffsetDateTime']['output']>;
  id: Scalars['ID']['output'];
  initiatorLogin?: Maybe<Scalars['String']['output']>;
  initiatorName?: Maybe<Scalars['String']['output']>;
  lastChangeDate?: Maybe<Scalars['_DateTime']['output']>;
  operationName?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['String']['output']>;
  params?: Maybe<Scalars['String']['output']>;
  query: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  ref?: Maybe<Scalars['String']['output']>;
  rejectReason?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  sqlQueryLimit?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<_En_SysRequestControlStatus>;
  sys_ver?: Maybe<Scalars['Long']['output']>;
};

export type _Ec_Clinic = {
  __typename?: '_EC_Clinic';
  count: Scalars['Int']['output'];
  elems: Array<Clinic>;
};

export type _Ec_ClinicCustomer = {
  __typename?: '_EC_ClinicCustomer';
  count: Scalars['Int']['output'];
  elems: Array<ClinicCustomer>;
};

export type _Ec_ClinicDoctor = {
  __typename?: '_EC_ClinicDoctor';
  count: Scalars['Int']['output'];
  elems: Array<ClinicDoctor>;
};

export type _Ec_ClinicDoctorAvailability = {
  __typename?: '_EC_ClinicDoctorAvailability';
  count: Scalars['Int']['output'];
  elems: Array<ClinicDoctorAvailability>;
};

export type _Ec_ClinicDoctorTable = {
  __typename?: '_EC_ClinicDoctorTable';
  count: Scalars['Int']['output'];
  elems: Array<ClinicDoctorTable>;
};

export type _Ec_ClinicOffice = {
  __typename?: '_EC_ClinicOffice';
  count: Scalars['Int']['output'];
  elems: Array<ClinicOffice>;
};

export type _Ec_Customer = {
  __typename?: '_EC_Customer';
  count: Scalars['Int']['output'];
  elems: Array<Customer>;
};

export type _Ec_Doctor = {
  __typename?: '_EC_Doctor';
  count: Scalars['Int']['output'];
  elems: Array<Doctor>;
};

export type _Ec_DoctorType = {
  __typename?: '_EC_DoctorType';
  count: Scalars['Int']['output'];
  elems: Array<DoctorType>;
};

export type _Ec_Person = {
  __typename?: '_EC_Person';
  count: Scalars['Int']['output'];
  elems: Array<Person>;
};

export type _Ec_RootDictionary = {
  __typename?: '_EC_RootDictionary';
  count: Scalars['Int']['output'];
  elems: Array<RootDictionary>;
};

export type _Ec_SysCheckSelect = {
  __typename?: '_EC_SysCheckSelect';
  count: Scalars['Int']['output'];
  elems: Array<SysCheckSelect>;
};

export type _Ec_SysOperation = {
  __typename?: '_EC_SysOperation';
  count: Scalars['Int']['output'];
  elems: Array<SysOperation>;
};

export type _Ec_SysParamAddition = {
  __typename?: '_EC_SysParamAddition';
  count: Scalars['Int']['output'];
  elems: Array<SysParamAddition>;
};

export type _Ec_SysRequestControl = {
  __typename?: '_EC_SysRequestControl';
  count: Scalars['Int']['output'];
  elems: Array<SysRequestControl>;
};

export enum _En_Sex {
  M = 'M',
  W = 'W'
}

export enum _En_SysOperationTarget {
  Adm = 'ADM',
  Api = 'API'
}

export enum _En_SysRequestControlStatus {
  Approved = 'APPROVED',
  Failed = 'FAILED',
  Rejected = 'REJECTED',
  Succeeded = 'SUCCEEDED',
  Valid = 'VALID'
}

export type _Enc_Sex = {
  __typename?: '_ENC_Sex';
  count: Scalars['Int']['output'];
  elems: Array<_En_Sex>;
};

export type _Enc_SysOperationTarget = {
  __typename?: '_ENC_SysOperationTarget';
  count: Scalars['Int']['output'];
  elems: Array<_En_SysOperationTarget>;
};

export type _Enc_SysRequestControlStatus = {
  __typename?: '_ENC_SysRequestControlStatus';
  count: Scalars['Int']['output'];
  elems: Array<_En_SysRequestControlStatus>;
};

export type _Entity = {
  id: Scalars['ID']['output'];
};

export type _ExistDoctorTypeInput = {
  compare?: InputMaybe<_CompareDoctorTypeInput>;
  update?: InputMaybe<_ExistUpdateDoctorTypeInput>;
};

export type _ExistPersonInput = {
  compare?: InputMaybe<_ComparePersonInput>;
  update?: InputMaybe<_ExistUpdatePersonInput>;
};

export type _ExistUpdateDoctorTypeInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  descr?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type _ExistUpdatePersonInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  birthDate?: InputMaybe<Scalars['_Date']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<_En_Sex>;
};

export type _G_Address = {
  __typename?: '_G_Address';
  city?: Maybe<Scalars['String']['output']>;
  flatNo?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
};

export type _G_CustomerReference = {
  __typename?: '_G_CustomerReference';
  entity?: Maybe<Customer>;
  entityId?: Maybe<Scalars['String']['output']>;
};


export type _G_CustomerReferenceEntityArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};

export type _G_DoctorReference = {
  __typename?: '_G_DoctorReference';
  entity?: Maybe<Doctor>;
  entityId?: Maybe<Scalars['String']['output']>;
};


export type _G_DoctorReferenceEntityArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};

export type _G_PersonReference = {
  __typename?: '_G_PersonReference';
  entity?: Maybe<Person>;
  entityId?: Maybe<Scalars['String']['output']>;
};


export type _G_PersonReferenceEntityArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};

export type _GenericExprInput = {
  expr: Scalars['String']['input'];
  fieldName: Scalars['String']['input'];
};

export enum _GetLockMode {
  NotUse = 'NOT_USE',
  Nowait = 'NOWAIT',
  Wait = 'WAIT'
}

export type _IncBigDecimalValue = {
  fail?: InputMaybe<_IncBigDecimalValueFail>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
  value: Scalars['BigDecimal']['input'];
};

export type _IncBigDecimalValueFail = {
  operator: _IncFailOperator;
  value: Scalars['BigDecimal']['input'];
};

export type _IncDoubleValue = {
  fail?: InputMaybe<_IncDoubleValueFail>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
  value: Scalars['Float']['input'];
};

export type _IncDoubleValueFail = {
  operator: _IncFailOperator;
  value: Scalars['Float']['input'];
};

export enum _IncFailOperator {
  Ge = 'ge',
  Gt = 'gt',
  Le = 'le',
  Lt = 'lt'
}

export type _IncFloatValue = {
  fail?: InputMaybe<_IncFloatValueFail>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
  value: Scalars['_Float4']['input'];
};

export type _IncFloatValueFail = {
  operator: _IncFailOperator;
  value: Scalars['_Float4']['input'];
};

export type _IncIntValue = {
  fail?: InputMaybe<_IncIntValueFail>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
  value: Scalars['Int']['input'];
};

export type _IncIntValueFail = {
  operator: _IncFailOperator;
  value: Scalars['Int']['input'];
};

export type _IncLongValue = {
  fail?: InputMaybe<_IncLongValueFail>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
  value: Scalars['Long']['input'];
};

export type _IncLongValueFail = {
  operator: _IncFailOperator;
  value: Scalars['Long']['input'];
};

export type _MergedEntitiesCollection = {
  __typename?: '_MergedEntitiesCollection';
  count: Scalars['Int']['output'];
  elems: Array<_Entity>;
};

export type _Mutation = {
  __typename?: '_Mutation';
  dictionaryPacket?: Maybe<_DictionaryPacket>;
  packet?: Maybe<_Packet>;
};


export type _MutationPacketArgs = {
  aggregateVersion?: InputMaybe<Scalars['Long']['input']>;
  idempotencePacketId?: InputMaybe<Scalars['String']['input']>;
};

export type _Packet = {
  __typename?: '_Packet';
  _calc?: Maybe<_Calculation>;
  aggregateVersion?: Maybe<Scalars['Long']['output']>;
  createClinic?: Maybe<Clinic>;
  createClinicCustomer?: Maybe<ClinicCustomer>;
  createClinicDoctor?: Maybe<ClinicDoctor>;
  createClinicDoctorAvailability?: Maybe<ClinicDoctorAvailability>;
  createClinicDoctorTable?: Maybe<ClinicDoctorTable>;
  createClinicOffice?: Maybe<ClinicOffice>;
  createCustomer?: Maybe<Customer>;
  createDoctor?: Maybe<Doctor>;
  createManyClinic?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createManyClinicCustomer?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createManyClinicDoctor?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createManyClinicDoctorAvailability?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createManyClinicDoctorTable?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createManyClinicOffice?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createManyCustomer?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createManyDoctor?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createManyPerson?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createPerson?: Maybe<Person>;
  deleteClinic?: Maybe<Scalars['String']['output']>;
  deleteClinicCustomer?: Maybe<Scalars['String']['output']>;
  deleteClinicDoctor?: Maybe<Scalars['String']['output']>;
  deleteClinicDoctorAvailability?: Maybe<Scalars['String']['output']>;
  deleteClinicDoctorTable?: Maybe<Scalars['String']['output']>;
  deleteClinicOffice?: Maybe<Scalars['String']['output']>;
  deleteCustomer?: Maybe<Scalars['String']['output']>;
  deleteDoctor?: Maybe<Scalars['String']['output']>;
  deleteManyClinic?: Maybe<Scalars['String']['output']>;
  deleteManyClinicCustomer?: Maybe<Scalars['String']['output']>;
  deleteManyClinicDoctor?: Maybe<Scalars['String']['output']>;
  deleteManyClinicDoctorAvailability?: Maybe<Scalars['String']['output']>;
  deleteManyClinicDoctorTable?: Maybe<Scalars['String']['output']>;
  deleteManyClinicOffice?: Maybe<Scalars['String']['output']>;
  deleteManyCustomer?: Maybe<Scalars['String']['output']>;
  deleteManyDoctor?: Maybe<Scalars['String']['output']>;
  deleteManyPerson?: Maybe<Scalars['String']['output']>;
  deletePerson?: Maybe<Scalars['String']['output']>;
  getClinic?: Maybe<Clinic>;
  getClinicCustomer?: Maybe<ClinicCustomer>;
  getClinicDoctor?: Maybe<ClinicDoctor>;
  getClinicDoctorAvailability?: Maybe<ClinicDoctorAvailability>;
  getClinicDoctorTable?: Maybe<ClinicDoctorTable>;
  getClinicOffice?: Maybe<ClinicOffice>;
  getCustomer?: Maybe<Customer>;
  getDoctor?: Maybe<Doctor>;
  getDoctorType?: Maybe<DoctorType>;
  getPerson?: Maybe<Person>;
  isIdempotenceResponse?: Maybe<Scalars['Boolean']['output']>;
  updateClinic?: Maybe<Clinic>;
  updateClinicCustomer?: Maybe<ClinicCustomer>;
  updateClinicDoctor?: Maybe<ClinicDoctor>;
  updateClinicDoctorAvailability?: Maybe<ClinicDoctorAvailability>;
  updateClinicDoctorTable?: Maybe<ClinicDoctorTable>;
  updateClinicOffice?: Maybe<ClinicOffice>;
  updateCustomer?: Maybe<Customer>;
  updateDoctor?: Maybe<Doctor>;
  updateManyClinic: Scalars['String']['output'];
  updateManyClinicCustomer: Scalars['String']['output'];
  updateManyClinicDoctor: Scalars['String']['output'];
  updateManyClinicDoctorAvailability: Scalars['String']['output'];
  updateManyClinicDoctorTable: Scalars['String']['output'];
  updateManyClinicOffice: Scalars['String']['output'];
  updateManyCustomer: Scalars['String']['output'];
  updateManyDoctor: Scalars['String']['output'];
  updateManyPerson: Scalars['String']['output'];
  updateOrCreateManyPerson?: Maybe<Array<Maybe<_UpdateOrCreateManyResponse>>>;
  updateOrCreatePerson?: Maybe<_UpdateOrCreatePersonResponse>;
  updatePerson?: Maybe<Person>;
};


export type _PacketCreateClinicArgs = {
  input: _CreateClinicInput;
};


export type _PacketCreateClinicCustomerArgs = {
  input: _CreateClinicCustomerInput;
};


export type _PacketCreateClinicDoctorArgs = {
  input: _CreateClinicDoctorInput;
};


export type _PacketCreateClinicDoctorAvailabilityArgs = {
  input: _CreateClinicDoctorAvailabilityInput;
};


export type _PacketCreateClinicDoctorTableArgs = {
  input: _CreateClinicDoctorTableInput;
};


export type _PacketCreateClinicOfficeArgs = {
  input: _CreateClinicOfficeInput;
};


export type _PacketCreateCustomerArgs = {
  input: _CreateCustomerInput;
};


export type _PacketCreateDoctorArgs = {
  input: _CreateDoctorInput;
};


export type _PacketCreateManyClinicArgs = {
  input: Array<_CreateClinicInput>;
};


export type _PacketCreateManyClinicCustomerArgs = {
  input: Array<_CreateClinicCustomerInput>;
};


export type _PacketCreateManyClinicDoctorArgs = {
  input: Array<_CreateClinicDoctorInput>;
};


export type _PacketCreateManyClinicDoctorAvailabilityArgs = {
  input: Array<_CreateClinicDoctorAvailabilityInput>;
};


export type _PacketCreateManyClinicDoctorTableArgs = {
  input: Array<_CreateClinicDoctorTableInput>;
};


export type _PacketCreateManyClinicOfficeArgs = {
  input: Array<_CreateClinicOfficeInput>;
};


export type _PacketCreateManyCustomerArgs = {
  input: Array<_CreateCustomerInput>;
};


export type _PacketCreateManyDoctorArgs = {
  input: Array<_CreateDoctorInput>;
};


export type _PacketCreateManyPersonArgs = {
  input: Array<_CreatePersonInput>;
};


export type _PacketCreatePersonArgs = {
  input: _CreatePersonInput;
};


export type _PacketDeleteClinicArgs = {
  compare?: InputMaybe<_CompareClinicInput>;
  id: Scalars['ID']['input'];
};


export type _PacketDeleteClinicCustomerArgs = {
  id: Scalars['ID']['input'];
};


export type _PacketDeleteClinicDoctorArgs = {
  id: Scalars['ID']['input'];
};


export type _PacketDeleteClinicDoctorAvailabilityArgs = {
  compare?: InputMaybe<_CompareClinicDoctorAvailabilityInput>;
  id: Scalars['ID']['input'];
};


export type _PacketDeleteClinicDoctorTableArgs = {
  compare?: InputMaybe<_CompareClinicDoctorTableInput>;
  id: Scalars['ID']['input'];
};


export type _PacketDeleteClinicOfficeArgs = {
  compare?: InputMaybe<_CompareClinicOfficeInput>;
  id: Scalars['ID']['input'];
};


export type _PacketDeleteCustomerArgs = {
  compare?: InputMaybe<_CompareCustomerInput>;
  id: Scalars['ID']['input'];
};


export type _PacketDeleteDoctorArgs = {
  id: Scalars['ID']['input'];
};


export type _PacketDeleteManyClinicArgs = {
  input: Array<_DeleteManyClinicInput>;
};


export type _PacketDeleteManyClinicCustomerArgs = {
  input: Array<_DeleteManyClinicCustomerInput>;
};


export type _PacketDeleteManyClinicDoctorArgs = {
  input: Array<_DeleteManyClinicDoctorInput>;
};


export type _PacketDeleteManyClinicDoctorAvailabilityArgs = {
  input: Array<_DeleteManyClinicDoctorAvailabilityInput>;
};


export type _PacketDeleteManyClinicDoctorTableArgs = {
  input: Array<_DeleteManyClinicDoctorTableInput>;
};


export type _PacketDeleteManyClinicOfficeArgs = {
  input: Array<_DeleteManyClinicOfficeInput>;
};


export type _PacketDeleteManyCustomerArgs = {
  input: Array<_DeleteManyCustomerInput>;
};


export type _PacketDeleteManyDoctorArgs = {
  input: Array<_DeleteManyDoctorInput>;
};


export type _PacketDeleteManyPersonArgs = {
  input: Array<_DeleteManyPersonInput>;
};


export type _PacketDeletePersonArgs = {
  compare?: InputMaybe<_ComparePersonInput>;
  id: Scalars['ID']['input'];
};


export type _PacketGetClinicArgs = {
  failOnEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  lock?: _GetLockMode;
};


export type _PacketGetClinicCustomerArgs = {
  failOnEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  lock?: _GetLockMode;
};


export type _PacketGetClinicDoctorArgs = {
  failOnEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  lock?: _GetLockMode;
};


export type _PacketGetClinicDoctorAvailabilityArgs = {
  failOnEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  lock?: _GetLockMode;
};


export type _PacketGetClinicDoctorTableArgs = {
  failOnEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  lock?: _GetLockMode;
};


export type _PacketGetClinicOfficeArgs = {
  failOnEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  lock?: _GetLockMode;
};


export type _PacketGetCustomerArgs = {
  failOnEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  lock?: _GetLockMode;
};


export type _PacketGetDoctorArgs = {
  failOnEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  lock?: _GetLockMode;
};


export type _PacketGetDoctorTypeArgs = {
  failOnEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  lock?: _GetLockMode;
};


export type _PacketGetPersonArgs = {
  failOnEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  lock?: _GetLockMode;
};


export type _PacketUpdateClinicArgs = {
  compare?: InputMaybe<_CompareClinicInput>;
  input: _UpdateClinicInput;
};


export type _PacketUpdateClinicCustomerArgs = {
  input: _UpdateClinicCustomerInput;
};


export type _PacketUpdateClinicDoctorArgs = {
  input: _UpdateClinicDoctorInput;
};


export type _PacketUpdateClinicDoctorAvailabilityArgs = {
  compare?: InputMaybe<_CompareClinicDoctorAvailabilityInput>;
  input: _UpdateClinicDoctorAvailabilityInput;
};


export type _PacketUpdateClinicDoctorTableArgs = {
  compare?: InputMaybe<_CompareClinicDoctorTableInput>;
  input: _UpdateClinicDoctorTableInput;
};


export type _PacketUpdateClinicOfficeArgs = {
  compare?: InputMaybe<_CompareClinicOfficeInput>;
  input: _UpdateClinicOfficeInput;
};


export type _PacketUpdateCustomerArgs = {
  compare?: InputMaybe<_CompareCustomerInput>;
  input: _UpdateCustomerInput;
};


export type _PacketUpdateDoctorArgs = {
  input: _UpdateDoctorInput;
};


export type _PacketUpdateManyClinicArgs = {
  input: Array<_UpdateManyClinicInput>;
};


export type _PacketUpdateManyClinicCustomerArgs = {
  input: Array<_UpdateManyClinicCustomerInput>;
};


export type _PacketUpdateManyClinicDoctorArgs = {
  input: Array<_UpdateManyClinicDoctorInput>;
};


export type _PacketUpdateManyClinicDoctorAvailabilityArgs = {
  input: Array<_UpdateManyClinicDoctorAvailabilityInput>;
};


export type _PacketUpdateManyClinicDoctorTableArgs = {
  input: Array<_UpdateManyClinicDoctorTableInput>;
};


export type _PacketUpdateManyClinicOfficeArgs = {
  input: Array<_UpdateManyClinicOfficeInput>;
};


export type _PacketUpdateManyCustomerArgs = {
  input: Array<_UpdateManyCustomerInput>;
};


export type _PacketUpdateManyDoctorArgs = {
  input: Array<_UpdateManyDoctorInput>;
};


export type _PacketUpdateManyPersonArgs = {
  input: Array<_UpdateManyPersonInput>;
};


export type _PacketUpdateOrCreateManyPersonArgs = {
  input: Array<_UpdateOrCreateManyPersonInput>;
};


export type _PacketUpdateOrCreatePersonArgs = {
  exist?: InputMaybe<_ExistPersonInput>;
  input: _CreatePersonInput;
};


export type _PacketUpdatePersonArgs = {
  compare?: InputMaybe<_ComparePersonInput>;
  input: _UpdatePersonInput;
};

export type _Query = {
  __typename?: '_Query';
  merge: _MergedEntitiesCollection;
  resolveReferences: Array<_Reference>;
  searchClinic: _Ec_Clinic;
  searchClinicCustomer: _Ec_ClinicCustomer;
  searchClinicDoctor: _Ec_ClinicDoctor;
  searchClinicDoctorAvailability: _Ec_ClinicDoctorAvailability;
  searchClinicDoctorTable: _Ec_ClinicDoctorTable;
  searchClinicOffice: _Ec_ClinicOffice;
  searchCustomer: _Ec_Customer;
  searchDoctor: _Ec_Doctor;
  searchDoctorType: _Ec_DoctorType;
  searchPerson: _Ec_Person;
  searchRootDictionary: _Ec_RootDictionary;
  searchSysCheckSelect: _Ec_SysCheckSelect;
  searchSysOperation: _Ec_SysOperation;
  searchSysParamAddition: _Ec_SysParamAddition;
  searchSysRequestControl: _Ec_SysRequestControl;
};


export type _QueryMergeArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _QueryResolveReferencesArgs = {
  ids: Array<Scalars['ID']['input']>;
  referenceType: Scalars['String']['input'];
};


export type _QuerySearchClinicArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  partCond?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _QuerySearchClinicCustomerArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  partCond?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _QuerySearchClinicDoctorArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  partCond?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _QuerySearchClinicDoctorAvailabilityArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  partCond?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _QuerySearchClinicDoctorTableArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  partCond?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _QuerySearchClinicOfficeArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  partCond?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _QuerySearchCustomerArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  partCond?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _QuerySearchDoctorArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  partCond?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _QuerySearchDoctorTypeArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  partCond?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _QuerySearchPersonArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  partCond?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _QuerySearchRootDictionaryArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  partCond?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _QuerySearchSysCheckSelectArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  partCond?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _QuerySearchSysOperationArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  partCond?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _QuerySearchSysParamAdditionArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  partCond?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type _QuerySearchSysRequestControlArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  partCond?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};

export type _R_Clinic = _Reference & {
  __typename?: '_R_Clinic';
  entity?: Maybe<Clinic>;
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _R_ClinicCustomer = _Reference & {
  __typename?: '_R_ClinicCustomer';
  entity?: Maybe<ClinicCustomer>;
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _R_ClinicDoctor = _Reference & {
  __typename?: '_R_ClinicDoctor';
  entity?: Maybe<ClinicDoctor>;
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _R_ClinicDoctorAvailability = _Reference & {
  __typename?: '_R_ClinicDoctorAvailability';
  entity?: Maybe<ClinicDoctorAvailability>;
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _R_ClinicDoctorTable = _Reference & {
  __typename?: '_R_ClinicDoctorTable';
  entity?: Maybe<ClinicDoctorTable>;
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _R_ClinicOffice = _Reference & {
  __typename?: '_R_ClinicOffice';
  entity?: Maybe<ClinicOffice>;
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _R_Customer = _Reference & {
  __typename?: '_R_Customer';
  entity?: Maybe<Customer>;
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _R_Doctor = _Reference & {
  __typename?: '_R_Doctor';
  entity?: Maybe<Doctor>;
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _R_DoctorType = _Reference & {
  __typename?: '_R_DoctorType';
  entity?: Maybe<DoctorType>;
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _R_Person = _Reference & {
  __typename?: '_R_Person';
  entity?: Maybe<Person>;
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _R_RootDictionary = _Reference & {
  __typename?: '_R_RootDictionary';
  entity?: Maybe<RootDictionary>;
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _R_SysCheckSelect = _Reference & {
  __typename?: '_R_SysCheckSelect';
  entity?: Maybe<SysCheckSelect>;
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _R_SysOperation = _Reference & {
  __typename?: '_R_SysOperation';
  entity?: Maybe<SysOperation>;
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _R_SysParamAddition = _Reference & {
  __typename?: '_R_SysParamAddition';
  entity?: Maybe<SysParamAddition>;
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _R_SysRequestControl = _Reference & {
  __typename?: '_R_SysRequestControl';
  entity?: Maybe<SysRequestControl>;
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _Reference = {
  entityId?: Maybe<Scalars['String']['output']>;
};

export type _SingleReferenceInput = {
  entityId: Scalars['String']['input'];
};

export type _SortCriterionSpecification = {
  crit: Scalars['String']['input'];
  nullsLast?: InputMaybe<Scalars['Boolean']['input']>;
  order?: _SortOrder;
};

export enum _SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type _UpdateClinicCustomerInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  clinic?: InputMaybe<Scalars['ID']['input']>;
  customer?: InputMaybe<_SingleReferenceInput>;
  id: Scalars['ID']['input'];
};

export type _UpdateClinicDoctorAvailabilityInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  beginDate?: InputMaybe<Scalars['_DateTime']['input']>;
  clinicDoctor?: InputMaybe<Scalars['ID']['input']>;
  clinicOffice?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['_DateTime']['input']>;
  id: Scalars['ID']['input'];
};

export type _UpdateClinicDoctorInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  clinic?: InputMaybe<Scalars['ID']['input']>;
  doctor?: InputMaybe<_SingleReferenceInput>;
  id: Scalars['ID']['input'];
};

export type _UpdateClinicDoctorTableInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  beginDate?: InputMaybe<Scalars['_DateTime']['input']>;
  clinicCustomer?: InputMaybe<Scalars['ID']['input']>;
  clinicDoctorAvailability?: InputMaybe<Scalars['ID']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['_DateTime']['input']>;
  id: Scalars['ID']['input'];
};

export type _UpdateClinicInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  address?: InputMaybe<_AddressInput>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type _UpdateClinicOfficeInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  clinic?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  officeNum?: InputMaybe<Scalars['String']['input']>;
};

export type _UpdateCustomerInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  id: Scalars['ID']['input'];
  insuranceNum?: InputMaybe<Scalars['String']['input']>;
  person?: InputMaybe<_SingleReferenceInput>;
};

export type _UpdateDoctorInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  doctorType?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  person?: InputMaybe<_SingleReferenceInput>;
};

export type _UpdateManyClinicCustomerInput = {
  param?: InputMaybe<_UpdateClinicCustomerInput>;
};

export type _UpdateManyClinicDoctorAvailabilityInput = {
  compare?: InputMaybe<_CompareClinicDoctorAvailabilityInput>;
  param?: InputMaybe<_UpdateClinicDoctorAvailabilityInput>;
};

export type _UpdateManyClinicDoctorInput = {
  param?: InputMaybe<_UpdateClinicDoctorInput>;
};

export type _UpdateManyClinicDoctorTableInput = {
  compare?: InputMaybe<_CompareClinicDoctorTableInput>;
  param?: InputMaybe<_UpdateClinicDoctorTableInput>;
};

export type _UpdateManyClinicInput = {
  compare?: InputMaybe<_CompareClinicInput>;
  param?: InputMaybe<_UpdateClinicInput>;
};

export type _UpdateManyClinicOfficeInput = {
  compare?: InputMaybe<_CompareClinicOfficeInput>;
  param?: InputMaybe<_UpdateClinicOfficeInput>;
};

export type _UpdateManyCustomerInput = {
  compare?: InputMaybe<_CompareCustomerInput>;
  param?: InputMaybe<_UpdateCustomerInput>;
};

export type _UpdateManyDoctorInput = {
  param?: InputMaybe<_UpdateDoctorInput>;
};

export type _UpdateManyPersonInput = {
  compare?: InputMaybe<_ComparePersonInput>;
  param?: InputMaybe<_UpdatePersonInput>;
};

export type _UpdateOrCreateDoctorTypeResponse = {
  __typename?: '_UpdateOrCreateDoctorTypeResponse';
  created?: Maybe<Scalars['Boolean']['output']>;
  returning?: Maybe<DoctorType>;
};

export type _UpdateOrCreateManyDoctorTypeInput = {
  exist?: InputMaybe<_ExistDoctorTypeInput>;
  param: _CreateDoctorTypeInput;
};

export type _UpdateOrCreateManyPersonInput = {
  exist?: InputMaybe<_ExistPersonInput>;
  param: _CreatePersonInput;
};

export type _UpdateOrCreateManyResponse = {
  __typename?: '_UpdateOrCreateManyResponse';
  created?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
};

export type _UpdateOrCreatePersonResponse = {
  __typename?: '_UpdateOrCreatePersonResponse';
  created?: Maybe<Scalars['Boolean']['output']>;
  returning?: Maybe<Person>;
};

export type _UpdatePersonInput = {
  _expr?: InputMaybe<Array<InputMaybe<_GenericExprInput>>>;
  birthDate?: InputMaybe<Scalars['_Date']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<_En_Sex>;
};

export type Clinic = {
  _calc: _Calculation;
  address: _G_Address;
  aggVersion: Scalars['Long']['output'];
  clinicCustomerList: _Ec_ClinicCustomer;
  clinicDoctorList: _Ec_ClinicDoctor;
  clinicOfficeList: _Ec_ClinicOffice;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  sys_ver?: Maybe<Scalars['Long']['output']>;
  type: Scalars['String']['output'];
};


export type ClinicClinicCustomerListArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type ClinicClinicDoctorListArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type ClinicClinicOfficeListArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};

export type ClinicCustomer = {
  _calc: _Calculation;
  aggregateRoot?: Maybe<Clinic>;
  aggVersion: Scalars['Long']['output'];
  clinic: Clinic;
  clinicCustomerTableLost: _Ec_ClinicDoctorTable;
  customer: _G_CustomerReference;
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
};


export type ClinicCustomerAggregateRootArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type ClinicCustomerClinicArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type ClinicCustomerClinicCustomerTableLostArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};

export type ClinicDoctor = {
  _calc: _Calculation;
  aggregateRoot?: Maybe<Clinic>;
  aggVersion: Scalars['Long']['output'];
  clinic: Clinic;
  clinicDoctorAvailabilityList: _Ec_ClinicDoctorAvailability;
  doctor: _G_DoctorReference;
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
};


export type ClinicDoctorAggregateRootArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type ClinicDoctorClinicArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type ClinicDoctorClinicDoctorAvailabilityListArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};

export type ClinicDoctorAvailability = {
  _calc: _Calculation;
  aggregateRoot?: Maybe<Clinic>;
  aggVersion: Scalars['Long']['output'];
  beginDate: Scalars['_DateTime']['output'];
  clinicDoctor: ClinicDoctor;
  clinicDoctorTableList: _Ec_ClinicDoctorTable;
  clinicOffice: ClinicOffice;
  endDate: Scalars['_DateTime']['output'];
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
};


export type ClinicDoctorAvailabilityAggregateRootArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type ClinicDoctorAvailabilityClinicDoctorArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type ClinicDoctorAvailabilityClinicDoctorTableListArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type ClinicDoctorAvailabilityClinicOfficeArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};

export type ClinicDoctorTable = {
  _calc: _Calculation;
  aggregateRoot?: Maybe<Clinic>;
  aggVersion: Scalars['Long']['output'];
  beginDate: Scalars['_DateTime']['output'];
  clinicCustomer: ClinicCustomer;
  clinicDoctorAvailability: ClinicDoctorAvailability;
  comment?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['_DateTime']['output'];
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
};


export type ClinicDoctorTableAggregateRootArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type ClinicDoctorTableClinicCustomerArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type ClinicDoctorTableClinicDoctorAvailabilityArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};

export type ClinicOffice = {
  _calc: _Calculation;
  aggregateRoot?: Maybe<Clinic>;
  aggVersion: Scalars['Long']['output'];
  clinic: Clinic;
  clinicOfficeAvailabilityList: _Ec_ClinicDoctorAvailability;
  id: Scalars['ID']['output'];
  officeNum: Scalars['String']['output'];
  type: Scalars['String']['output'];
};


export type ClinicOfficeAggregateRootArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type ClinicOfficeClinicArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};


export type ClinicOfficeClinicOfficeAvailabilityListArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};

export type Customer = {
  _calc: _Calculation;
  aggVersion: Scalars['Long']['output'];
  id: Scalars['ID']['output'];
  insuranceNum: Scalars['String']['output'];
  person: _G_PersonReference;
  sys_ver?: Maybe<Scalars['Long']['output']>;
  type: Scalars['String']['output'];
};

export type Doctor = {
  _calc: _Calculation;
  aggVersion: Scalars['Long']['output'];
  doctorType: DoctorType;
  id: Scalars['ID']['output'];
  person: _G_PersonReference;
  sys_ver?: Maybe<Scalars['Long']['output']>;
  type: Scalars['String']['output'];
};


export type DoctorDoctorTypeArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};

export type DoctorType = {
  _calc: _Calculation;
  aggregateRoot?: Maybe<RootDictionary>;
  descr?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  sys_ver?: Maybe<Scalars['Long']['output']>;
  type: Scalars['String']['output'];
};


export type DoctorTypeAggregateRootArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};

export type Person = {
  _calc: _Calculation;
  aggVersion: Scalars['Long']['output'];
  birthDate?: Maybe<Scalars['_Date']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  sex: _En_Sex;
  sys_ver?: Maybe<Scalars['Long']['output']>;
  type: Scalars['String']['output'];
};

export type RootDictionary = {
  _calc: _Calculation;
  id: Scalars['ID']['output'];
  sys_ver?: Maybe<Scalars['Long']['output']>;
  type: Scalars['String']['output'];
};

export type SysCheckSelect = {
  _calc: _Calculation;
  aggVersion: Scalars['Long']['output'];
  beforeCommitEnable?: Maybe<Scalars['Boolean']['output']>;
  beforeOperationDisable?: Maybe<Scalars['Boolean']['output']>;
  conditionValue?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  operation: SysOperation;
  orderValue?: Maybe<Scalars['Int']['output']>;
  typeName?: Maybe<Scalars['String']['output']>;
};


export type SysCheckSelectOperationArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};

export type SysOperation = {
  _calc: _Calculation;
  aggVersion: Scalars['Long']['output'];
  allowEmptyChecks?: Maybe<Scalars['Boolean']['output']>;
  audit?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['String']['output']>;
  bypassBLRules?: Maybe<Scalars['Boolean']['output']>;
  checkForAnyPrivilege?: Maybe<Scalars['String']['output']>;
  checkSelects: _Ec_SysCheckSelect;
  description?: Maybe<Scalars['String']['output']>;
  disableJwtVerification?: Maybe<Scalars['Boolean']['output']>;
  doc?: Maybe<Scalars['String']['output']>;
  hashValue?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  paramAdditions: _Ec_SysParamAddition;
  pathConditions?: Maybe<Scalars['String']['output']>;
  sqlQueryLimit?: Maybe<Scalars['Int']['output']>;
  target?: Maybe<_En_SysOperationTarget>;
};


export type SysOperationCheckSelectsArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};


export type SysOperationParamAdditionsArgs = {
  cond?: InputMaybe<Scalars['String']['input']>;
  elemAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<_SortCriterionSpecification>>;
};

export type SysParamAddition = {
  _calc: _Calculation;
  aggVersion: Scalars['Long']['output'];
  id: Scalars['ID']['output'];
  operation: SysOperation;
  paramAddition?: Maybe<Scalars['String']['output']>;
  paramName?: Maybe<Scalars['String']['output']>;
};


export type SysParamAdditionOperationArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
};

export type SysRequestControl = {
  _calc: _Calculation;
  aggVersion: Scalars['Long']['output'];
  approverLogin?: Maybe<Scalars['String']['output']>;
  approverName?: Maybe<Scalars['String']['output']>;
  bypassBLRules?: Maybe<Scalars['Boolean']['output']>;
  creationTime: Scalars['_OffsetDateTime']['output'];
  decisionTime?: Maybe<Scalars['_OffsetDateTime']['output']>;
  errors?: Maybe<Scalars['String']['output']>;
  executionTime?: Maybe<Scalars['_OffsetDateTime']['output']>;
  id: Scalars['ID']['output'];
  initiatorLogin?: Maybe<Scalars['String']['output']>;
  initiatorName?: Maybe<Scalars['String']['output']>;
  lastChangeDate?: Maybe<Scalars['_DateTime']['output']>;
  operationName?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['String']['output']>;
  params?: Maybe<Scalars['String']['output']>;
  query: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  ref?: Maybe<Scalars['String']['output']>;
  rejectReason?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  sqlQueryLimit?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<_En_SysRequestControlStatus>;
  sys_ver?: Maybe<Scalars['Long']['output']>;
};

export type ClinicAttributesFragment = { __typename: '_E_Clinic', id: string, name: string, address: { __typename?: '_G_Address', city?: string | null, flatNo?: string | null, street?: string | null } };

export type SearchClinicQueryVariables = Exact<{
  cond?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchClinicQuery = { __typename?: '_Query', searchClinic: { __typename?: '_EC_Clinic', elems: Array<{ __typename: '_E_Clinic', id: string, name: string, address: { __typename?: '_G_Address', city?: string | null, flatNo?: string | null, street?: string | null } }> } };

export type GetForUpdateClinicMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetForUpdateClinicMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', getClinic?: { __typename: '_E_Clinic', id: string, name: string, address: { __typename?: '_G_Address', city?: string | null, flatNo?: string | null, street?: string | null } } | null } | null };

export type CreateClinicMutationVariables = Exact<{
  input: _CreateClinicInput;
}>;


export type CreateClinicMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', createClinic?: { __typename: '_E_Clinic', id: string, name: string, address: { __typename?: '_G_Address', city?: string | null, flatNo?: string | null, street?: string | null } } | null } | null };

export type UpdateClinicMutationVariables = Exact<{
  input: _UpdateClinicInput;
}>;


export type UpdateClinicMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', updateClinic?: { __typename: '_E_Clinic', id: string, name: string, address: { __typename?: '_G_Address', city?: string | null, flatNo?: string | null, street?: string | null } } | null } | null };

export type DeleteClinicMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteClinicMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', deleteClinic?: string | null } | null };

export type ClinicCustomerAttributesFragment = { __typename: '_E_ClinicCustomer', id: string, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinic: { __typename?: '_E_Clinic', id: string }, customer: { __typename?: '_G_CustomerReference', entityId?: string | null } };

export type SearchClinicCustomerQueryVariables = Exact<{
  cond?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchClinicCustomerQuery = { __typename?: '_Query', searchClinicCustomer: { __typename?: '_EC_ClinicCustomer', elems: Array<{ __typename: '_E_ClinicCustomer', id: string, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinic: { __typename?: '_E_Clinic', id: string }, customer: { __typename?: '_G_CustomerReference', entityId?: string | null } }> } };

export type GetForUpdateClinicCustomerMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetForUpdateClinicCustomerMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', getClinicCustomer?: { __typename: '_E_ClinicCustomer', id: string, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinic: { __typename?: '_E_Clinic', id: string }, customer: { __typename?: '_G_CustomerReference', entityId?: string | null } } | null } | null };

export type CreateClinicCustomerMutationVariables = Exact<{
  input: _CreateClinicCustomerInput;
}>;


export type CreateClinicCustomerMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', createClinicCustomer?: { __typename: '_E_ClinicCustomer', id: string, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinic: { __typename?: '_E_Clinic', id: string }, customer: { __typename?: '_G_CustomerReference', entityId?: string | null } } | null } | null };

export type UpdateClinicCustomerMutationVariables = Exact<{
  input: _UpdateClinicCustomerInput;
}>;


export type UpdateClinicCustomerMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', updateClinicCustomer?: { __typename: '_E_ClinicCustomer', id: string, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinic: { __typename?: '_E_Clinic', id: string }, customer: { __typename?: '_G_CustomerReference', entityId?: string | null } } | null } | null };

export type DeleteClinicCustomerMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteClinicCustomerMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', deleteClinicCustomer?: string | null } | null };

export type ClinicDoctorAttributesFragment = { __typename: '_E_ClinicDoctor', id: string, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinic: { __typename?: '_E_Clinic', id: string }, doctor: { __typename?: '_G_DoctorReference', entityId?: string | null } };

export type SearchClinicDoctorQueryVariables = Exact<{
  cond?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchClinicDoctorQuery = { __typename?: '_Query', searchClinicDoctor: { __typename?: '_EC_ClinicDoctor', elems: Array<{ __typename: '_E_ClinicDoctor', id: string, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinic: { __typename?: '_E_Clinic', id: string }, doctor: { __typename?: '_G_DoctorReference', entityId?: string | null } }> } };

export type GetForUpdateClinicDoctorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetForUpdateClinicDoctorMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', getClinicDoctor?: { __typename: '_E_ClinicDoctor', id: string, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinic: { __typename?: '_E_Clinic', id: string }, doctor: { __typename?: '_G_DoctorReference', entityId?: string | null } } | null } | null };

export type CreateClinicDoctorMutationVariables = Exact<{
  input: _CreateClinicDoctorInput;
}>;


export type CreateClinicDoctorMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', createClinicDoctor?: { __typename: '_E_ClinicDoctor', id: string, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinic: { __typename?: '_E_Clinic', id: string }, doctor: { __typename?: '_G_DoctorReference', entityId?: string | null } } | null } | null };

export type UpdateClinicDoctorMutationVariables = Exact<{
  input: _UpdateClinicDoctorInput;
}>;


export type UpdateClinicDoctorMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', updateClinicDoctor?: { __typename: '_E_ClinicDoctor', id: string, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinic: { __typename?: '_E_Clinic', id: string }, doctor: { __typename?: '_G_DoctorReference', entityId?: string | null } } | null } | null };

export type DeleteClinicDoctorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteClinicDoctorMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', deleteClinicDoctor?: string | null } | null };

export type ClinicDoctorAvailabilityAttributesFragment = { __typename: '_E_ClinicDoctorAvailability', id: string, beginDate: any, endDate: any, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinicDoctor: { __typename?: '_E_ClinicDoctor', id: string }, clinicOffice: { __typename?: '_E_ClinicOffice', id: string } };

export type SearchClinicDoctorAvailabilityQueryVariables = Exact<{
  cond?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchClinicDoctorAvailabilityQuery = { __typename?: '_Query', searchClinicDoctorAvailability: { __typename?: '_EC_ClinicDoctorAvailability', elems: Array<{ __typename: '_E_ClinicDoctorAvailability', id: string, beginDate: any, endDate: any, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinicDoctor: { __typename?: '_E_ClinicDoctor', id: string }, clinicOffice: { __typename?: '_E_ClinicOffice', id: string } }> } };

export type GetForUpdateClinicDoctorAvailabilityMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetForUpdateClinicDoctorAvailabilityMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', getClinicDoctorAvailability?: { __typename: '_E_ClinicDoctorAvailability', id: string, beginDate: any, endDate: any, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinicDoctor: { __typename?: '_E_ClinicDoctor', id: string }, clinicOffice: { __typename?: '_E_ClinicOffice', id: string } } | null } | null };

export type CreateClinicDoctorAvailabilityMutationVariables = Exact<{
  input: _CreateClinicDoctorAvailabilityInput;
}>;


export type CreateClinicDoctorAvailabilityMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', createClinicDoctorAvailability?: { __typename: '_E_ClinicDoctorAvailability', id: string, beginDate: any, endDate: any, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinicDoctor: { __typename?: '_E_ClinicDoctor', id: string }, clinicOffice: { __typename?: '_E_ClinicOffice', id: string } } | null } | null };

export type UpdateClinicDoctorAvailabilityMutationVariables = Exact<{
  input: _UpdateClinicDoctorAvailabilityInput;
}>;


export type UpdateClinicDoctorAvailabilityMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', updateClinicDoctorAvailability?: { __typename: '_E_ClinicDoctorAvailability', id: string, beginDate: any, endDate: any, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinicDoctor: { __typename?: '_E_ClinicDoctor', id: string }, clinicOffice: { __typename?: '_E_ClinicOffice', id: string } } | null } | null };

export type DeleteClinicDoctorAvailabilityMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteClinicDoctorAvailabilityMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', deleteClinicDoctorAvailability?: string | null } | null };

export type ClinicDoctorTableAttributesFragment = { __typename: '_E_ClinicDoctorTable', id: string, beginDate: any, comment?: string | null, endDate: any, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinicCustomer: { __typename?: '_E_ClinicCustomer', id: string }, clinicDoctorAvailability: { __typename?: '_E_ClinicDoctorAvailability', id: string } };

export type SearchClinicDoctorTableQueryVariables = Exact<{
  cond?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchClinicDoctorTableQuery = { __typename?: '_Query', searchClinicDoctorTable: { __typename?: '_EC_ClinicDoctorTable', elems: Array<{ __typename: '_E_ClinicDoctorTable', id: string, beginDate: any, comment?: string | null, endDate: any, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinicCustomer: { __typename?: '_E_ClinicCustomer', id: string }, clinicDoctorAvailability: { __typename?: '_E_ClinicDoctorAvailability', id: string } }> } };

export type GetForUpdateClinicDoctorTableMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetForUpdateClinicDoctorTableMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', getClinicDoctorTable?: { __typename: '_E_ClinicDoctorTable', id: string, beginDate: any, comment?: string | null, endDate: any, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinicCustomer: { __typename?: '_E_ClinicCustomer', id: string }, clinicDoctorAvailability: { __typename?: '_E_ClinicDoctorAvailability', id: string } } | null } | null };

export type CreateClinicDoctorTableMutationVariables = Exact<{
  input: _CreateClinicDoctorTableInput;
}>;


export type CreateClinicDoctorTableMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', createClinicDoctorTable?: { __typename: '_E_ClinicDoctorTable', id: string, beginDate: any, comment?: string | null, endDate: any, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinicCustomer: { __typename?: '_E_ClinicCustomer', id: string }, clinicDoctorAvailability: { __typename?: '_E_ClinicDoctorAvailability', id: string } } | null } | null };

export type UpdateClinicDoctorTableMutationVariables = Exact<{
  input: _UpdateClinicDoctorTableInput;
}>;


export type UpdateClinicDoctorTableMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', updateClinicDoctorTable?: { __typename: '_E_ClinicDoctorTable', id: string, beginDate: any, comment?: string | null, endDate: any, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinicCustomer: { __typename?: '_E_ClinicCustomer', id: string }, clinicDoctorAvailability: { __typename?: '_E_ClinicDoctorAvailability', id: string } } | null } | null };

export type DeleteClinicDoctorTableMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteClinicDoctorTableMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', deleteClinicDoctorTable?: string | null } | null };

export type ClinicOfficeAttributesFragment = { __typename: '_E_ClinicOffice', id: string, officeNum: string, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinic: { __typename?: '_E_Clinic', id: string } };

export type SearchClinicOfficeQueryVariables = Exact<{
  cond?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchClinicOfficeQuery = { __typename?: '_Query', searchClinicOffice: { __typename?: '_EC_ClinicOffice', elems: Array<{ __typename: '_E_ClinicOffice', id: string, officeNum: string, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinic: { __typename?: '_E_Clinic', id: string } }> } };

export type GetForUpdateClinicOfficeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetForUpdateClinicOfficeMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', getClinicOffice?: { __typename: '_E_ClinicOffice', id: string, officeNum: string, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinic: { __typename?: '_E_Clinic', id: string } } | null } | null };

export type CreateClinicOfficeMutationVariables = Exact<{
  input: _CreateClinicOfficeInput;
}>;


export type CreateClinicOfficeMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', createClinicOffice?: { __typename: '_E_ClinicOffice', id: string, officeNum: string, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinic: { __typename?: '_E_Clinic', id: string } } | null } | null };

export type UpdateClinicOfficeMutationVariables = Exact<{
  input: _UpdateClinicOfficeInput;
}>;


export type UpdateClinicOfficeMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', updateClinicOffice?: { __typename: '_E_ClinicOffice', id: string, officeNum: string, aggregateRoot?: { __typename?: '_E_Clinic', id: string } | null, clinic: { __typename?: '_E_Clinic', id: string } } | null } | null };

export type DeleteClinicOfficeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteClinicOfficeMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', deleteClinicOffice?: string | null } | null };

export type CustomerAttributesFragment = { __typename: '_E_Customer', id: string, insuranceNum: string, person: { __typename?: '_G_PersonReference', entityId?: string | null } };

export type SearchCustomerQueryVariables = Exact<{
  cond?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchCustomerQuery = { __typename?: '_Query', searchCustomer: { __typename?: '_EC_Customer', elems: Array<{ __typename: '_E_Customer', id: string, insuranceNum: string, person: { __typename?: '_G_PersonReference', entityId?: string | null } }> } };

export type GetForUpdateCustomerMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetForUpdateCustomerMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', getCustomer?: { __typename: '_E_Customer', id: string, insuranceNum: string, person: { __typename?: '_G_PersonReference', entityId?: string | null } } | null } | null };

export type CreateCustomerMutationVariables = Exact<{
  input: _CreateCustomerInput;
}>;


export type CreateCustomerMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', createCustomer?: { __typename: '_E_Customer', id: string, insuranceNum: string, person: { __typename?: '_G_PersonReference', entityId?: string | null } } | null } | null };

export type UpdateCustomerMutationVariables = Exact<{
  input: _UpdateCustomerInput;
}>;


export type UpdateCustomerMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', updateCustomer?: { __typename: '_E_Customer', id: string, insuranceNum: string, person: { __typename?: '_G_PersonReference', entityId?: string | null } } | null } | null };

export type DeleteCustomerMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCustomerMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', deleteCustomer?: string | null } | null };

export type DoctorAttributesFragment = { __typename: '_E_Doctor', id: string, doctorType: { __typename?: '_E_DoctorType', id: string }, person: { __typename?: '_G_PersonReference', entityId?: string | null } };

export type SearchDoctorQueryVariables = Exact<{
  cond?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchDoctorQuery = { __typename?: '_Query', searchDoctor: { __typename?: '_EC_Doctor', elems: Array<{ __typename: '_E_Doctor', id: string, doctorType: { __typename?: '_E_DoctorType', id: string }, person: { __typename?: '_G_PersonReference', entityId?: string | null } }> } };

export type GetForUpdateDoctorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetForUpdateDoctorMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', getDoctor?: { __typename: '_E_Doctor', id: string, doctorType: { __typename?: '_E_DoctorType', id: string }, person: { __typename?: '_G_PersonReference', entityId?: string | null } } | null } | null };

export type CreateDoctorMutationVariables = Exact<{
  input: _CreateDoctorInput;
}>;


export type CreateDoctorMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', createDoctor?: { __typename: '_E_Doctor', id: string, doctorType: { __typename?: '_E_DoctorType', id: string }, person: { __typename?: '_G_PersonReference', entityId?: string | null } } | null } | null };

export type UpdateDoctorMutationVariables = Exact<{
  input: _UpdateDoctorInput;
}>;


export type UpdateDoctorMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', updateDoctor?: { __typename: '_E_Doctor', id: string, doctorType: { __typename?: '_E_DoctorType', id: string }, person: { __typename?: '_G_PersonReference', entityId?: string | null } } | null } | null };

export type DeleteDoctorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteDoctorMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', deleteDoctor?: string | null } | null };

export type PersonAttributesFragment = { __typename: '_E_Person', id: string, birthDate?: any | null, firstName: string, lastName: string, sex: _En_Sex };

export type SearchPersonQueryVariables = Exact<{
  cond?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchPersonQuery = { __typename?: '_Query', searchPerson: { __typename?: '_EC_Person', elems: Array<{ __typename: '_E_Person', id: string, birthDate?: any | null, firstName: string, lastName: string, sex: _En_Sex }> } };

export type GetForUpdatePersonMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetForUpdatePersonMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', getPerson?: { __typename: '_E_Person', id: string, birthDate?: any | null, firstName: string, lastName: string, sex: _En_Sex } | null } | null };

export type CreatePersonMutationVariables = Exact<{
  input: _CreatePersonInput;
}>;


export type CreatePersonMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', createPerson?: { __typename: '_E_Person', id: string, birthDate?: any | null, firstName: string, lastName: string, sex: _En_Sex } | null } | null };

export type UpdatePersonMutationVariables = Exact<{
  input: _UpdatePersonInput;
}>;


export type UpdatePersonMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', updatePerson?: { __typename: '_E_Person', id: string, birthDate?: any | null, firstName: string, lastName: string, sex: _En_Sex } | null } | null };

export type DeletePersonMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePersonMutation = { __typename?: '_Mutation', packet?: { __typename?: '_Packet', deletePerson?: string | null } | null };

export type DoctorTypeAttributesFragment = { __typename: '_E_DoctorType', id: string, descr?: string | null, name: string };

export type SearchDoctorTypeQueryVariables = Exact<{
  cond?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchDoctorTypeQuery = { __typename?: '_Query', searchDoctorType: { __typename?: '_EC_DoctorType', elems: Array<{ __typename: '_E_DoctorType', id: string, descr?: string | null, name: string }> } };

export type GetForUpdateDoctorTypeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetForUpdateDoctorTypeMutation = { __typename?: '_Mutation', packet?: { __typename?: '_DictionaryPacket', getDoctorType?: { __typename: '_E_DoctorType', id: string, descr?: string | null, name: string } | null } | null };

export type UpdateOrCreateDoctorTypeMutationVariables = Exact<{
  input: _CreateDoctorTypeInput;
}>;


export type UpdateOrCreateDoctorTypeMutation = { __typename?: '_Mutation', dictionaryPacket?: { __typename?: '_DictionaryPacket', updateOrCreateDoctorType?: { __typename?: '_UpdateOrCreateDoctorTypeResponse', returning?: { __typename: '_E_DoctorType', id: string, descr?: string | null, name: string } | null } | null } | null };

export const ClinicAttributesFragmentDoc = gql`
    fragment ClinicAttributes on _E_Clinic {
  id
  __typename
  address {
    city
    flatNo
    street
  }
  name
}
    `;
export const ClinicCustomerAttributesFragmentDoc = gql`
    fragment ClinicCustomerAttributes on _E_ClinicCustomer {
  id
  __typename
  aggregateRoot {
    id
  }
  clinic {
    id
  }
  customer {
    entityId
  }
}
    `;
export const ClinicDoctorAttributesFragmentDoc = gql`
    fragment ClinicDoctorAttributes on _E_ClinicDoctor {
  id
  __typename
  aggregateRoot {
    id
  }
  clinic {
    id
  }
  doctor {
    entityId
  }
}
    `;
export const ClinicDoctorAvailabilityAttributesFragmentDoc = gql`
    fragment ClinicDoctorAvailabilityAttributes on _E_ClinicDoctorAvailability {
  id
  __typename
  aggregateRoot {
    id
  }
  beginDate
  clinicDoctor {
    id
  }
  clinicOffice {
    id
  }
  endDate
}
    `;
export const ClinicDoctorTableAttributesFragmentDoc = gql`
    fragment ClinicDoctorTableAttributes on _E_ClinicDoctorTable {
  id
  __typename
  aggregateRoot {
    id
  }
  beginDate
  clinicCustomer {
    id
  }
  clinicDoctorAvailability {
    id
  }
  comment
  endDate
}
    `;
export const ClinicOfficeAttributesFragmentDoc = gql`
    fragment ClinicOfficeAttributes on _E_ClinicOffice {
  id
  __typename
  aggregateRoot {
    id
  }
  clinic {
    id
  }
  officeNum
}
    `;
export const CustomerAttributesFragmentDoc = gql`
    fragment CustomerAttributes on _E_Customer {
  id
  __typename
  insuranceNum
  person {
    entityId
  }
}
    `;
export const DoctorAttributesFragmentDoc = gql`
    fragment DoctorAttributes on _E_Doctor {
  id
  __typename
  doctorType {
    id
  }
  person {
    entityId
  }
}
    `;
export const PersonAttributesFragmentDoc = gql`
    fragment PersonAttributes on _E_Person {
  id
  __typename
  birthDate
  firstName
  lastName
  sex
}
    `;
export const DoctorTypeAttributesFragmentDoc = gql`
    fragment DoctorTypeAttributes on _E_DoctorType {
  id
  __typename
  descr
  name
}
    `;
export const SearchClinicDocument = gql`
    query searchClinic($cond: String) {
  searchClinic(cond: $cond) {
    elems {
      ...ClinicAttributes
    }
  }
}
    ${ClinicAttributesFragmentDoc}`;

/**
 * __useSearchClinicQuery__
 *
 * To run a query within a React component, call `useSearchClinicQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchClinicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchClinicQuery({
 *   variables: {
 *      cond: // value for 'cond'
 *   },
 * });
 */
export function useSearchClinicQuery(baseOptions?: Apollo.QueryHookOptions<SearchClinicQuery, SearchClinicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchClinicQuery, SearchClinicQueryVariables>(SearchClinicDocument, options);
      }
export function useSearchClinicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchClinicQuery, SearchClinicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchClinicQuery, SearchClinicQueryVariables>(SearchClinicDocument, options);
        }
// @ts-ignore
export function useSearchClinicSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchClinicQuery, SearchClinicQueryVariables>): Apollo.UseSuspenseQueryResult<SearchClinicQuery, SearchClinicQueryVariables>;
export function useSearchClinicSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchClinicQuery, SearchClinicQueryVariables>): Apollo.UseSuspenseQueryResult<SearchClinicQuery | undefined, SearchClinicQueryVariables>;
export function useSearchClinicSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchClinicQuery, SearchClinicQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchClinicQuery, SearchClinicQueryVariables>(SearchClinicDocument, options);
        }
export type SearchClinicQueryHookResult = ReturnType<typeof useSearchClinicQuery>;
export type SearchClinicLazyQueryHookResult = ReturnType<typeof useSearchClinicLazyQuery>;
export type SearchClinicSuspenseQueryHookResult = ReturnType<typeof useSearchClinicSuspenseQuery>;
export type SearchClinicQueryResult = Apollo.QueryResult<SearchClinicQuery, SearchClinicQueryVariables>;
export const GetForUpdateClinicDocument = gql`
    mutation getForUpdateClinic($id: ID!) {
  packet {
    getClinic(id: $id) {
      ...ClinicAttributes
    }
  }
}
    ${ClinicAttributesFragmentDoc}`;
export type GetForUpdateClinicMutationFn = Apollo.MutationFunction<GetForUpdateClinicMutation, GetForUpdateClinicMutationVariables>;

/**
 * __useGetForUpdateClinicMutation__
 *
 * To run a mutation, you first call `useGetForUpdateClinicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetForUpdateClinicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getForUpdateClinicMutation, { data, loading, error }] = useGetForUpdateClinicMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetForUpdateClinicMutation(baseOptions?: Apollo.MutationHookOptions<GetForUpdateClinicMutation, GetForUpdateClinicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetForUpdateClinicMutation, GetForUpdateClinicMutationVariables>(GetForUpdateClinicDocument, options);
      }
export type GetForUpdateClinicMutationHookResult = ReturnType<typeof useGetForUpdateClinicMutation>;
export type GetForUpdateClinicMutationResult = Apollo.MutationResult<GetForUpdateClinicMutation>;
export type GetForUpdateClinicMutationOptions = Apollo.BaseMutationOptions<GetForUpdateClinicMutation, GetForUpdateClinicMutationVariables>;
export const CreateClinicDocument = gql`
    mutation createClinic($input: _CreateClinicInput!) {
  packet {
    createClinic(input: $input) {
      ...ClinicAttributes
    }
  }
}
    ${ClinicAttributesFragmentDoc}`;
export type CreateClinicMutationFn = Apollo.MutationFunction<CreateClinicMutation, CreateClinicMutationVariables>;

/**
 * __useCreateClinicMutation__
 *
 * To run a mutation, you first call `useCreateClinicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClinicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClinicMutation, { data, loading, error }] = useCreateClinicMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClinicMutation(baseOptions?: Apollo.MutationHookOptions<CreateClinicMutation, CreateClinicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClinicMutation, CreateClinicMutationVariables>(CreateClinicDocument, options);
      }
export type CreateClinicMutationHookResult = ReturnType<typeof useCreateClinicMutation>;
export type CreateClinicMutationResult = Apollo.MutationResult<CreateClinicMutation>;
export type CreateClinicMutationOptions = Apollo.BaseMutationOptions<CreateClinicMutation, CreateClinicMutationVariables>;
export const UpdateClinicDocument = gql`
    mutation updateClinic($input: _UpdateClinicInput!) {
  packet {
    updateClinic(input: $input) {
      ...ClinicAttributes
    }
  }
}
    ${ClinicAttributesFragmentDoc}`;
export type UpdateClinicMutationFn = Apollo.MutationFunction<UpdateClinicMutation, UpdateClinicMutationVariables>;

/**
 * __useUpdateClinicMutation__
 *
 * To run a mutation, you first call `useUpdateClinicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClinicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClinicMutation, { data, loading, error }] = useUpdateClinicMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateClinicMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClinicMutation, UpdateClinicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClinicMutation, UpdateClinicMutationVariables>(UpdateClinicDocument, options);
      }
export type UpdateClinicMutationHookResult = ReturnType<typeof useUpdateClinicMutation>;
export type UpdateClinicMutationResult = Apollo.MutationResult<UpdateClinicMutation>;
export type UpdateClinicMutationOptions = Apollo.BaseMutationOptions<UpdateClinicMutation, UpdateClinicMutationVariables>;
export const DeleteClinicDocument = gql`
    mutation deleteClinic($id: ID!) {
  packet {
    deleteClinic(id: $id)
  }
}
    `;
export type DeleteClinicMutationFn = Apollo.MutationFunction<DeleteClinicMutation, DeleteClinicMutationVariables>;

/**
 * __useDeleteClinicMutation__
 *
 * To run a mutation, you first call `useDeleteClinicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClinicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClinicMutation, { data, loading, error }] = useDeleteClinicMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClinicMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClinicMutation, DeleteClinicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClinicMutation, DeleteClinicMutationVariables>(DeleteClinicDocument, options);
      }
export type DeleteClinicMutationHookResult = ReturnType<typeof useDeleteClinicMutation>;
export type DeleteClinicMutationResult = Apollo.MutationResult<DeleteClinicMutation>;
export type DeleteClinicMutationOptions = Apollo.BaseMutationOptions<DeleteClinicMutation, DeleteClinicMutationVariables>;
export const SearchClinicCustomerDocument = gql`
    query searchClinicCustomer($cond: String) {
  searchClinicCustomer(cond: $cond) {
    elems {
      ...ClinicCustomerAttributes
    }
  }
}
    ${ClinicCustomerAttributesFragmentDoc}`;

/**
 * __useSearchClinicCustomerQuery__
 *
 * To run a query within a React component, call `useSearchClinicCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchClinicCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchClinicCustomerQuery({
 *   variables: {
 *      cond: // value for 'cond'
 *   },
 * });
 */
export function useSearchClinicCustomerQuery(baseOptions?: Apollo.QueryHookOptions<SearchClinicCustomerQuery, SearchClinicCustomerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchClinicCustomerQuery, SearchClinicCustomerQueryVariables>(SearchClinicCustomerDocument, options);
      }
export function useSearchClinicCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchClinicCustomerQuery, SearchClinicCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchClinicCustomerQuery, SearchClinicCustomerQueryVariables>(SearchClinicCustomerDocument, options);
        }
// @ts-ignore
export function useSearchClinicCustomerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchClinicCustomerQuery, SearchClinicCustomerQueryVariables>): Apollo.UseSuspenseQueryResult<SearchClinicCustomerQuery, SearchClinicCustomerQueryVariables>;
export function useSearchClinicCustomerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchClinicCustomerQuery, SearchClinicCustomerQueryVariables>): Apollo.UseSuspenseQueryResult<SearchClinicCustomerQuery | undefined, SearchClinicCustomerQueryVariables>;
export function useSearchClinicCustomerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchClinicCustomerQuery, SearchClinicCustomerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchClinicCustomerQuery, SearchClinicCustomerQueryVariables>(SearchClinicCustomerDocument, options);
        }
export type SearchClinicCustomerQueryHookResult = ReturnType<typeof useSearchClinicCustomerQuery>;
export type SearchClinicCustomerLazyQueryHookResult = ReturnType<typeof useSearchClinicCustomerLazyQuery>;
export type SearchClinicCustomerSuspenseQueryHookResult = ReturnType<typeof useSearchClinicCustomerSuspenseQuery>;
export type SearchClinicCustomerQueryResult = Apollo.QueryResult<SearchClinicCustomerQuery, SearchClinicCustomerQueryVariables>;
export const GetForUpdateClinicCustomerDocument = gql`
    mutation getForUpdateClinicCustomer($id: ID!) {
  packet {
    getClinicCustomer(id: $id) {
      ...ClinicCustomerAttributes
    }
  }
}
    ${ClinicCustomerAttributesFragmentDoc}`;
export type GetForUpdateClinicCustomerMutationFn = Apollo.MutationFunction<GetForUpdateClinicCustomerMutation, GetForUpdateClinicCustomerMutationVariables>;

/**
 * __useGetForUpdateClinicCustomerMutation__
 *
 * To run a mutation, you first call `useGetForUpdateClinicCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetForUpdateClinicCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getForUpdateClinicCustomerMutation, { data, loading, error }] = useGetForUpdateClinicCustomerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetForUpdateClinicCustomerMutation(baseOptions?: Apollo.MutationHookOptions<GetForUpdateClinicCustomerMutation, GetForUpdateClinicCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetForUpdateClinicCustomerMutation, GetForUpdateClinicCustomerMutationVariables>(GetForUpdateClinicCustomerDocument, options);
      }
export type GetForUpdateClinicCustomerMutationHookResult = ReturnType<typeof useGetForUpdateClinicCustomerMutation>;
export type GetForUpdateClinicCustomerMutationResult = Apollo.MutationResult<GetForUpdateClinicCustomerMutation>;
export type GetForUpdateClinicCustomerMutationOptions = Apollo.BaseMutationOptions<GetForUpdateClinicCustomerMutation, GetForUpdateClinicCustomerMutationVariables>;
export const CreateClinicCustomerDocument = gql`
    mutation createClinicCustomer($input: _CreateClinicCustomerInput!) {
  packet {
    createClinicCustomer(input: $input) {
      ...ClinicCustomerAttributes
    }
  }
}
    ${ClinicCustomerAttributesFragmentDoc}`;
export type CreateClinicCustomerMutationFn = Apollo.MutationFunction<CreateClinicCustomerMutation, CreateClinicCustomerMutationVariables>;

/**
 * __useCreateClinicCustomerMutation__
 *
 * To run a mutation, you first call `useCreateClinicCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClinicCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClinicCustomerMutation, { data, loading, error }] = useCreateClinicCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClinicCustomerMutation(baseOptions?: Apollo.MutationHookOptions<CreateClinicCustomerMutation, CreateClinicCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClinicCustomerMutation, CreateClinicCustomerMutationVariables>(CreateClinicCustomerDocument, options);
      }
export type CreateClinicCustomerMutationHookResult = ReturnType<typeof useCreateClinicCustomerMutation>;
export type CreateClinicCustomerMutationResult = Apollo.MutationResult<CreateClinicCustomerMutation>;
export type CreateClinicCustomerMutationOptions = Apollo.BaseMutationOptions<CreateClinicCustomerMutation, CreateClinicCustomerMutationVariables>;
export const UpdateClinicCustomerDocument = gql`
    mutation updateClinicCustomer($input: _UpdateClinicCustomerInput!) {
  packet {
    updateClinicCustomer(input: $input) {
      ...ClinicCustomerAttributes
    }
  }
}
    ${ClinicCustomerAttributesFragmentDoc}`;
export type UpdateClinicCustomerMutationFn = Apollo.MutationFunction<UpdateClinicCustomerMutation, UpdateClinicCustomerMutationVariables>;

/**
 * __useUpdateClinicCustomerMutation__
 *
 * To run a mutation, you first call `useUpdateClinicCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClinicCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClinicCustomerMutation, { data, loading, error }] = useUpdateClinicCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateClinicCustomerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClinicCustomerMutation, UpdateClinicCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClinicCustomerMutation, UpdateClinicCustomerMutationVariables>(UpdateClinicCustomerDocument, options);
      }
export type UpdateClinicCustomerMutationHookResult = ReturnType<typeof useUpdateClinicCustomerMutation>;
export type UpdateClinicCustomerMutationResult = Apollo.MutationResult<UpdateClinicCustomerMutation>;
export type UpdateClinicCustomerMutationOptions = Apollo.BaseMutationOptions<UpdateClinicCustomerMutation, UpdateClinicCustomerMutationVariables>;
export const DeleteClinicCustomerDocument = gql`
    mutation deleteClinicCustomer($id: ID!) {
  packet {
    deleteClinicCustomer(id: $id)
  }
}
    `;
export type DeleteClinicCustomerMutationFn = Apollo.MutationFunction<DeleteClinicCustomerMutation, DeleteClinicCustomerMutationVariables>;

/**
 * __useDeleteClinicCustomerMutation__
 *
 * To run a mutation, you first call `useDeleteClinicCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClinicCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClinicCustomerMutation, { data, loading, error }] = useDeleteClinicCustomerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClinicCustomerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClinicCustomerMutation, DeleteClinicCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClinicCustomerMutation, DeleteClinicCustomerMutationVariables>(DeleteClinicCustomerDocument, options);
      }
export type DeleteClinicCustomerMutationHookResult = ReturnType<typeof useDeleteClinicCustomerMutation>;
export type DeleteClinicCustomerMutationResult = Apollo.MutationResult<DeleteClinicCustomerMutation>;
export type DeleteClinicCustomerMutationOptions = Apollo.BaseMutationOptions<DeleteClinicCustomerMutation, DeleteClinicCustomerMutationVariables>;
export const SearchClinicDoctorDocument = gql`
    query searchClinicDoctor($cond: String) {
  searchClinicDoctor(cond: $cond) {
    elems {
      ...ClinicDoctorAttributes
    }
  }
}
    ${ClinicDoctorAttributesFragmentDoc}`;

/**
 * __useSearchClinicDoctorQuery__
 *
 * To run a query within a React component, call `useSearchClinicDoctorQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchClinicDoctorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchClinicDoctorQuery({
 *   variables: {
 *      cond: // value for 'cond'
 *   },
 * });
 */
export function useSearchClinicDoctorQuery(baseOptions?: Apollo.QueryHookOptions<SearchClinicDoctorQuery, SearchClinicDoctorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchClinicDoctorQuery, SearchClinicDoctorQueryVariables>(SearchClinicDoctorDocument, options);
      }
export function useSearchClinicDoctorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchClinicDoctorQuery, SearchClinicDoctorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchClinicDoctorQuery, SearchClinicDoctorQueryVariables>(SearchClinicDoctorDocument, options);
        }
// @ts-ignore
export function useSearchClinicDoctorSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchClinicDoctorQuery, SearchClinicDoctorQueryVariables>): Apollo.UseSuspenseQueryResult<SearchClinicDoctorQuery, SearchClinicDoctorQueryVariables>;
export function useSearchClinicDoctorSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchClinicDoctorQuery, SearchClinicDoctorQueryVariables>): Apollo.UseSuspenseQueryResult<SearchClinicDoctorQuery | undefined, SearchClinicDoctorQueryVariables>;
export function useSearchClinicDoctorSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchClinicDoctorQuery, SearchClinicDoctorQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchClinicDoctorQuery, SearchClinicDoctorQueryVariables>(SearchClinicDoctorDocument, options);
        }
export type SearchClinicDoctorQueryHookResult = ReturnType<typeof useSearchClinicDoctorQuery>;
export type SearchClinicDoctorLazyQueryHookResult = ReturnType<typeof useSearchClinicDoctorLazyQuery>;
export type SearchClinicDoctorSuspenseQueryHookResult = ReturnType<typeof useSearchClinicDoctorSuspenseQuery>;
export type SearchClinicDoctorQueryResult = Apollo.QueryResult<SearchClinicDoctorQuery, SearchClinicDoctorQueryVariables>;
export const GetForUpdateClinicDoctorDocument = gql`
    mutation getForUpdateClinicDoctor($id: ID!) {
  packet {
    getClinicDoctor(id: $id) {
      ...ClinicDoctorAttributes
    }
  }
}
    ${ClinicDoctorAttributesFragmentDoc}`;
export type GetForUpdateClinicDoctorMutationFn = Apollo.MutationFunction<GetForUpdateClinicDoctorMutation, GetForUpdateClinicDoctorMutationVariables>;

/**
 * __useGetForUpdateClinicDoctorMutation__
 *
 * To run a mutation, you first call `useGetForUpdateClinicDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetForUpdateClinicDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getForUpdateClinicDoctorMutation, { data, loading, error }] = useGetForUpdateClinicDoctorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetForUpdateClinicDoctorMutation(baseOptions?: Apollo.MutationHookOptions<GetForUpdateClinicDoctorMutation, GetForUpdateClinicDoctorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetForUpdateClinicDoctorMutation, GetForUpdateClinicDoctorMutationVariables>(GetForUpdateClinicDoctorDocument, options);
      }
export type GetForUpdateClinicDoctorMutationHookResult = ReturnType<typeof useGetForUpdateClinicDoctorMutation>;
export type GetForUpdateClinicDoctorMutationResult = Apollo.MutationResult<GetForUpdateClinicDoctorMutation>;
export type GetForUpdateClinicDoctorMutationOptions = Apollo.BaseMutationOptions<GetForUpdateClinicDoctorMutation, GetForUpdateClinicDoctorMutationVariables>;
export const CreateClinicDoctorDocument = gql`
    mutation createClinicDoctor($input: _CreateClinicDoctorInput!) {
  packet {
    createClinicDoctor(input: $input) {
      ...ClinicDoctorAttributes
    }
  }
}
    ${ClinicDoctorAttributesFragmentDoc}`;
export type CreateClinicDoctorMutationFn = Apollo.MutationFunction<CreateClinicDoctorMutation, CreateClinicDoctorMutationVariables>;

/**
 * __useCreateClinicDoctorMutation__
 *
 * To run a mutation, you first call `useCreateClinicDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClinicDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClinicDoctorMutation, { data, loading, error }] = useCreateClinicDoctorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClinicDoctorMutation(baseOptions?: Apollo.MutationHookOptions<CreateClinicDoctorMutation, CreateClinicDoctorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClinicDoctorMutation, CreateClinicDoctorMutationVariables>(CreateClinicDoctorDocument, options);
      }
export type CreateClinicDoctorMutationHookResult = ReturnType<typeof useCreateClinicDoctorMutation>;
export type CreateClinicDoctorMutationResult = Apollo.MutationResult<CreateClinicDoctorMutation>;
export type CreateClinicDoctorMutationOptions = Apollo.BaseMutationOptions<CreateClinicDoctorMutation, CreateClinicDoctorMutationVariables>;
export const UpdateClinicDoctorDocument = gql`
    mutation updateClinicDoctor($input: _UpdateClinicDoctorInput!) {
  packet {
    updateClinicDoctor(input: $input) {
      ...ClinicDoctorAttributes
    }
  }
}
    ${ClinicDoctorAttributesFragmentDoc}`;
export type UpdateClinicDoctorMutationFn = Apollo.MutationFunction<UpdateClinicDoctorMutation, UpdateClinicDoctorMutationVariables>;

/**
 * __useUpdateClinicDoctorMutation__
 *
 * To run a mutation, you first call `useUpdateClinicDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClinicDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClinicDoctorMutation, { data, loading, error }] = useUpdateClinicDoctorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateClinicDoctorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClinicDoctorMutation, UpdateClinicDoctorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClinicDoctorMutation, UpdateClinicDoctorMutationVariables>(UpdateClinicDoctorDocument, options);
      }
export type UpdateClinicDoctorMutationHookResult = ReturnType<typeof useUpdateClinicDoctorMutation>;
export type UpdateClinicDoctorMutationResult = Apollo.MutationResult<UpdateClinicDoctorMutation>;
export type UpdateClinicDoctorMutationOptions = Apollo.BaseMutationOptions<UpdateClinicDoctorMutation, UpdateClinicDoctorMutationVariables>;
export const DeleteClinicDoctorDocument = gql`
    mutation deleteClinicDoctor($id: ID!) {
  packet {
    deleteClinicDoctor(id: $id)
  }
}
    `;
export type DeleteClinicDoctorMutationFn = Apollo.MutationFunction<DeleteClinicDoctorMutation, DeleteClinicDoctorMutationVariables>;

/**
 * __useDeleteClinicDoctorMutation__
 *
 * To run a mutation, you first call `useDeleteClinicDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClinicDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClinicDoctorMutation, { data, loading, error }] = useDeleteClinicDoctorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClinicDoctorMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClinicDoctorMutation, DeleteClinicDoctorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClinicDoctorMutation, DeleteClinicDoctorMutationVariables>(DeleteClinicDoctorDocument, options);
      }
export type DeleteClinicDoctorMutationHookResult = ReturnType<typeof useDeleteClinicDoctorMutation>;
export type DeleteClinicDoctorMutationResult = Apollo.MutationResult<DeleteClinicDoctorMutation>;
export type DeleteClinicDoctorMutationOptions = Apollo.BaseMutationOptions<DeleteClinicDoctorMutation, DeleteClinicDoctorMutationVariables>;
export const SearchClinicDoctorAvailabilityDocument = gql`
    query searchClinicDoctorAvailability($cond: String) {
  searchClinicDoctorAvailability(cond: $cond) {
    elems {
      ...ClinicDoctorAvailabilityAttributes
    }
  }
}
    ${ClinicDoctorAvailabilityAttributesFragmentDoc}`;

/**
 * __useSearchClinicDoctorAvailabilityQuery__
 *
 * To run a query within a React component, call `useSearchClinicDoctorAvailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchClinicDoctorAvailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchClinicDoctorAvailabilityQuery({
 *   variables: {
 *      cond: // value for 'cond'
 *   },
 * });
 */
export function useSearchClinicDoctorAvailabilityQuery(baseOptions?: Apollo.QueryHookOptions<SearchClinicDoctorAvailabilityQuery, SearchClinicDoctorAvailabilityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchClinicDoctorAvailabilityQuery, SearchClinicDoctorAvailabilityQueryVariables>(SearchClinicDoctorAvailabilityDocument, options);
      }
export function useSearchClinicDoctorAvailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchClinicDoctorAvailabilityQuery, SearchClinicDoctorAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchClinicDoctorAvailabilityQuery, SearchClinicDoctorAvailabilityQueryVariables>(SearchClinicDoctorAvailabilityDocument, options);
        }
// @ts-ignore
export function useSearchClinicDoctorAvailabilitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchClinicDoctorAvailabilityQuery, SearchClinicDoctorAvailabilityQueryVariables>): Apollo.UseSuspenseQueryResult<SearchClinicDoctorAvailabilityQuery, SearchClinicDoctorAvailabilityQueryVariables>;
export function useSearchClinicDoctorAvailabilitySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchClinicDoctorAvailabilityQuery, SearchClinicDoctorAvailabilityQueryVariables>): Apollo.UseSuspenseQueryResult<SearchClinicDoctorAvailabilityQuery | undefined, SearchClinicDoctorAvailabilityQueryVariables>;
export function useSearchClinicDoctorAvailabilitySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchClinicDoctorAvailabilityQuery, SearchClinicDoctorAvailabilityQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchClinicDoctorAvailabilityQuery, SearchClinicDoctorAvailabilityQueryVariables>(SearchClinicDoctorAvailabilityDocument, options);
        }
export type SearchClinicDoctorAvailabilityQueryHookResult = ReturnType<typeof useSearchClinicDoctorAvailabilityQuery>;
export type SearchClinicDoctorAvailabilityLazyQueryHookResult = ReturnType<typeof useSearchClinicDoctorAvailabilityLazyQuery>;
export type SearchClinicDoctorAvailabilitySuspenseQueryHookResult = ReturnType<typeof useSearchClinicDoctorAvailabilitySuspenseQuery>;
export type SearchClinicDoctorAvailabilityQueryResult = Apollo.QueryResult<SearchClinicDoctorAvailabilityQuery, SearchClinicDoctorAvailabilityQueryVariables>;
export const GetForUpdateClinicDoctorAvailabilityDocument = gql`
    mutation getForUpdateClinicDoctorAvailability($id: ID!) {
  packet {
    getClinicDoctorAvailability(id: $id) {
      ...ClinicDoctorAvailabilityAttributes
    }
  }
}
    ${ClinicDoctorAvailabilityAttributesFragmentDoc}`;
export type GetForUpdateClinicDoctorAvailabilityMutationFn = Apollo.MutationFunction<GetForUpdateClinicDoctorAvailabilityMutation, GetForUpdateClinicDoctorAvailabilityMutationVariables>;

/**
 * __useGetForUpdateClinicDoctorAvailabilityMutation__
 *
 * To run a mutation, you first call `useGetForUpdateClinicDoctorAvailabilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetForUpdateClinicDoctorAvailabilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getForUpdateClinicDoctorAvailabilityMutation, { data, loading, error }] = useGetForUpdateClinicDoctorAvailabilityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetForUpdateClinicDoctorAvailabilityMutation(baseOptions?: Apollo.MutationHookOptions<GetForUpdateClinicDoctorAvailabilityMutation, GetForUpdateClinicDoctorAvailabilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetForUpdateClinicDoctorAvailabilityMutation, GetForUpdateClinicDoctorAvailabilityMutationVariables>(GetForUpdateClinicDoctorAvailabilityDocument, options);
      }
export type GetForUpdateClinicDoctorAvailabilityMutationHookResult = ReturnType<typeof useGetForUpdateClinicDoctorAvailabilityMutation>;
export type GetForUpdateClinicDoctorAvailabilityMutationResult = Apollo.MutationResult<GetForUpdateClinicDoctorAvailabilityMutation>;
export type GetForUpdateClinicDoctorAvailabilityMutationOptions = Apollo.BaseMutationOptions<GetForUpdateClinicDoctorAvailabilityMutation, GetForUpdateClinicDoctorAvailabilityMutationVariables>;
export const CreateClinicDoctorAvailabilityDocument = gql`
    mutation createClinicDoctorAvailability($input: _CreateClinicDoctorAvailabilityInput!) {
  packet {
    createClinicDoctorAvailability(input: $input) {
      ...ClinicDoctorAvailabilityAttributes
    }
  }
}
    ${ClinicDoctorAvailabilityAttributesFragmentDoc}`;
export type CreateClinicDoctorAvailabilityMutationFn = Apollo.MutationFunction<CreateClinicDoctorAvailabilityMutation, CreateClinicDoctorAvailabilityMutationVariables>;

/**
 * __useCreateClinicDoctorAvailabilityMutation__
 *
 * To run a mutation, you first call `useCreateClinicDoctorAvailabilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClinicDoctorAvailabilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClinicDoctorAvailabilityMutation, { data, loading, error }] = useCreateClinicDoctorAvailabilityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClinicDoctorAvailabilityMutation(baseOptions?: Apollo.MutationHookOptions<CreateClinicDoctorAvailabilityMutation, CreateClinicDoctorAvailabilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClinicDoctorAvailabilityMutation, CreateClinicDoctorAvailabilityMutationVariables>(CreateClinicDoctorAvailabilityDocument, options);
      }
export type CreateClinicDoctorAvailabilityMutationHookResult = ReturnType<typeof useCreateClinicDoctorAvailabilityMutation>;
export type CreateClinicDoctorAvailabilityMutationResult = Apollo.MutationResult<CreateClinicDoctorAvailabilityMutation>;
export type CreateClinicDoctorAvailabilityMutationOptions = Apollo.BaseMutationOptions<CreateClinicDoctorAvailabilityMutation, CreateClinicDoctorAvailabilityMutationVariables>;
export const UpdateClinicDoctorAvailabilityDocument = gql`
    mutation updateClinicDoctorAvailability($input: _UpdateClinicDoctorAvailabilityInput!) {
  packet {
    updateClinicDoctorAvailability(input: $input) {
      ...ClinicDoctorAvailabilityAttributes
    }
  }
}
    ${ClinicDoctorAvailabilityAttributesFragmentDoc}`;
export type UpdateClinicDoctorAvailabilityMutationFn = Apollo.MutationFunction<UpdateClinicDoctorAvailabilityMutation, UpdateClinicDoctorAvailabilityMutationVariables>;

/**
 * __useUpdateClinicDoctorAvailabilityMutation__
 *
 * To run a mutation, you first call `useUpdateClinicDoctorAvailabilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClinicDoctorAvailabilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClinicDoctorAvailabilityMutation, { data, loading, error }] = useUpdateClinicDoctorAvailabilityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateClinicDoctorAvailabilityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClinicDoctorAvailabilityMutation, UpdateClinicDoctorAvailabilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClinicDoctorAvailabilityMutation, UpdateClinicDoctorAvailabilityMutationVariables>(UpdateClinicDoctorAvailabilityDocument, options);
      }
export type UpdateClinicDoctorAvailabilityMutationHookResult = ReturnType<typeof useUpdateClinicDoctorAvailabilityMutation>;
export type UpdateClinicDoctorAvailabilityMutationResult = Apollo.MutationResult<UpdateClinicDoctorAvailabilityMutation>;
export type UpdateClinicDoctorAvailabilityMutationOptions = Apollo.BaseMutationOptions<UpdateClinicDoctorAvailabilityMutation, UpdateClinicDoctorAvailabilityMutationVariables>;
export const DeleteClinicDoctorAvailabilityDocument = gql`
    mutation deleteClinicDoctorAvailability($id: ID!) {
  packet {
    deleteClinicDoctorAvailability(id: $id)
  }
}
    `;
export type DeleteClinicDoctorAvailabilityMutationFn = Apollo.MutationFunction<DeleteClinicDoctorAvailabilityMutation, DeleteClinicDoctorAvailabilityMutationVariables>;

/**
 * __useDeleteClinicDoctorAvailabilityMutation__
 *
 * To run a mutation, you first call `useDeleteClinicDoctorAvailabilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClinicDoctorAvailabilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClinicDoctorAvailabilityMutation, { data, loading, error }] = useDeleteClinicDoctorAvailabilityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClinicDoctorAvailabilityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClinicDoctorAvailabilityMutation, DeleteClinicDoctorAvailabilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClinicDoctorAvailabilityMutation, DeleteClinicDoctorAvailabilityMutationVariables>(DeleteClinicDoctorAvailabilityDocument, options);
      }
export type DeleteClinicDoctorAvailabilityMutationHookResult = ReturnType<typeof useDeleteClinicDoctorAvailabilityMutation>;
export type DeleteClinicDoctorAvailabilityMutationResult = Apollo.MutationResult<DeleteClinicDoctorAvailabilityMutation>;
export type DeleteClinicDoctorAvailabilityMutationOptions = Apollo.BaseMutationOptions<DeleteClinicDoctorAvailabilityMutation, DeleteClinicDoctorAvailabilityMutationVariables>;
export const SearchClinicDoctorTableDocument = gql`
    query searchClinicDoctorTable($cond: String) {
  searchClinicDoctorTable(cond: $cond) {
    elems {
      ...ClinicDoctorTableAttributes
    }
  }
}
    ${ClinicDoctorTableAttributesFragmentDoc}`;

/**
 * __useSearchClinicDoctorTableQuery__
 *
 * To run a query within a React component, call `useSearchClinicDoctorTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchClinicDoctorTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchClinicDoctorTableQuery({
 *   variables: {
 *      cond: // value for 'cond'
 *   },
 * });
 */
export function useSearchClinicDoctorTableQuery(baseOptions?: Apollo.QueryHookOptions<SearchClinicDoctorTableQuery, SearchClinicDoctorTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchClinicDoctorTableQuery, SearchClinicDoctorTableQueryVariables>(SearchClinicDoctorTableDocument, options);
      }
export function useSearchClinicDoctorTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchClinicDoctorTableQuery, SearchClinicDoctorTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchClinicDoctorTableQuery, SearchClinicDoctorTableQueryVariables>(SearchClinicDoctorTableDocument, options);
        }
// @ts-ignore
export function useSearchClinicDoctorTableSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchClinicDoctorTableQuery, SearchClinicDoctorTableQueryVariables>): Apollo.UseSuspenseQueryResult<SearchClinicDoctorTableQuery, SearchClinicDoctorTableQueryVariables>;
export function useSearchClinicDoctorTableSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchClinicDoctorTableQuery, SearchClinicDoctorTableQueryVariables>): Apollo.UseSuspenseQueryResult<SearchClinicDoctorTableQuery | undefined, SearchClinicDoctorTableQueryVariables>;
export function useSearchClinicDoctorTableSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchClinicDoctorTableQuery, SearchClinicDoctorTableQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchClinicDoctorTableQuery, SearchClinicDoctorTableQueryVariables>(SearchClinicDoctorTableDocument, options);
        }
export type SearchClinicDoctorTableQueryHookResult = ReturnType<typeof useSearchClinicDoctorTableQuery>;
export type SearchClinicDoctorTableLazyQueryHookResult = ReturnType<typeof useSearchClinicDoctorTableLazyQuery>;
export type SearchClinicDoctorTableSuspenseQueryHookResult = ReturnType<typeof useSearchClinicDoctorTableSuspenseQuery>;
export type SearchClinicDoctorTableQueryResult = Apollo.QueryResult<SearchClinicDoctorTableQuery, SearchClinicDoctorTableQueryVariables>;
export const GetForUpdateClinicDoctorTableDocument = gql`
    mutation getForUpdateClinicDoctorTable($id: ID!) {
  packet {
    getClinicDoctorTable(id: $id) {
      ...ClinicDoctorTableAttributes
    }
  }
}
    ${ClinicDoctorTableAttributesFragmentDoc}`;
export type GetForUpdateClinicDoctorTableMutationFn = Apollo.MutationFunction<GetForUpdateClinicDoctorTableMutation, GetForUpdateClinicDoctorTableMutationVariables>;

/**
 * __useGetForUpdateClinicDoctorTableMutation__
 *
 * To run a mutation, you first call `useGetForUpdateClinicDoctorTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetForUpdateClinicDoctorTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getForUpdateClinicDoctorTableMutation, { data, loading, error }] = useGetForUpdateClinicDoctorTableMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetForUpdateClinicDoctorTableMutation(baseOptions?: Apollo.MutationHookOptions<GetForUpdateClinicDoctorTableMutation, GetForUpdateClinicDoctorTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetForUpdateClinicDoctorTableMutation, GetForUpdateClinicDoctorTableMutationVariables>(GetForUpdateClinicDoctorTableDocument, options);
      }
export type GetForUpdateClinicDoctorTableMutationHookResult = ReturnType<typeof useGetForUpdateClinicDoctorTableMutation>;
export type GetForUpdateClinicDoctorTableMutationResult = Apollo.MutationResult<GetForUpdateClinicDoctorTableMutation>;
export type GetForUpdateClinicDoctorTableMutationOptions = Apollo.BaseMutationOptions<GetForUpdateClinicDoctorTableMutation, GetForUpdateClinicDoctorTableMutationVariables>;
export const CreateClinicDoctorTableDocument = gql`
    mutation createClinicDoctorTable($input: _CreateClinicDoctorTableInput!) {
  packet {
    createClinicDoctorTable(input: $input) {
      ...ClinicDoctorTableAttributes
    }
  }
}
    ${ClinicDoctorTableAttributesFragmentDoc}`;
export type CreateClinicDoctorTableMutationFn = Apollo.MutationFunction<CreateClinicDoctorTableMutation, CreateClinicDoctorTableMutationVariables>;

/**
 * __useCreateClinicDoctorTableMutation__
 *
 * To run a mutation, you first call `useCreateClinicDoctorTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClinicDoctorTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClinicDoctorTableMutation, { data, loading, error }] = useCreateClinicDoctorTableMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClinicDoctorTableMutation(baseOptions?: Apollo.MutationHookOptions<CreateClinicDoctorTableMutation, CreateClinicDoctorTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClinicDoctorTableMutation, CreateClinicDoctorTableMutationVariables>(CreateClinicDoctorTableDocument, options);
      }
export type CreateClinicDoctorTableMutationHookResult = ReturnType<typeof useCreateClinicDoctorTableMutation>;
export type CreateClinicDoctorTableMutationResult = Apollo.MutationResult<CreateClinicDoctorTableMutation>;
export type CreateClinicDoctorTableMutationOptions = Apollo.BaseMutationOptions<CreateClinicDoctorTableMutation, CreateClinicDoctorTableMutationVariables>;
export const UpdateClinicDoctorTableDocument = gql`
    mutation updateClinicDoctorTable($input: _UpdateClinicDoctorTableInput!) {
  packet {
    updateClinicDoctorTable(input: $input) {
      ...ClinicDoctorTableAttributes
    }
  }
}
    ${ClinicDoctorTableAttributesFragmentDoc}`;
export type UpdateClinicDoctorTableMutationFn = Apollo.MutationFunction<UpdateClinicDoctorTableMutation, UpdateClinicDoctorTableMutationVariables>;

/**
 * __useUpdateClinicDoctorTableMutation__
 *
 * To run a mutation, you first call `useUpdateClinicDoctorTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClinicDoctorTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClinicDoctorTableMutation, { data, loading, error }] = useUpdateClinicDoctorTableMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateClinicDoctorTableMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClinicDoctorTableMutation, UpdateClinicDoctorTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClinicDoctorTableMutation, UpdateClinicDoctorTableMutationVariables>(UpdateClinicDoctorTableDocument, options);
      }
export type UpdateClinicDoctorTableMutationHookResult = ReturnType<typeof useUpdateClinicDoctorTableMutation>;
export type UpdateClinicDoctorTableMutationResult = Apollo.MutationResult<UpdateClinicDoctorTableMutation>;
export type UpdateClinicDoctorTableMutationOptions = Apollo.BaseMutationOptions<UpdateClinicDoctorTableMutation, UpdateClinicDoctorTableMutationVariables>;
export const DeleteClinicDoctorTableDocument = gql`
    mutation deleteClinicDoctorTable($id: ID!) {
  packet {
    deleteClinicDoctorTable(id: $id)
  }
}
    `;
export type DeleteClinicDoctorTableMutationFn = Apollo.MutationFunction<DeleteClinicDoctorTableMutation, DeleteClinicDoctorTableMutationVariables>;

/**
 * __useDeleteClinicDoctorTableMutation__
 *
 * To run a mutation, you first call `useDeleteClinicDoctorTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClinicDoctorTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClinicDoctorTableMutation, { data, loading, error }] = useDeleteClinicDoctorTableMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClinicDoctorTableMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClinicDoctorTableMutation, DeleteClinicDoctorTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClinicDoctorTableMutation, DeleteClinicDoctorTableMutationVariables>(DeleteClinicDoctorTableDocument, options);
      }
export type DeleteClinicDoctorTableMutationHookResult = ReturnType<typeof useDeleteClinicDoctorTableMutation>;
export type DeleteClinicDoctorTableMutationResult = Apollo.MutationResult<DeleteClinicDoctorTableMutation>;
export type DeleteClinicDoctorTableMutationOptions = Apollo.BaseMutationOptions<DeleteClinicDoctorTableMutation, DeleteClinicDoctorTableMutationVariables>;
export const SearchClinicOfficeDocument = gql`
    query searchClinicOffice($cond: String) {
  searchClinicOffice(cond: $cond) {
    elems {
      ...ClinicOfficeAttributes
    }
  }
}
    ${ClinicOfficeAttributesFragmentDoc}`;

/**
 * __useSearchClinicOfficeQuery__
 *
 * To run a query within a React component, call `useSearchClinicOfficeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchClinicOfficeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchClinicOfficeQuery({
 *   variables: {
 *      cond: // value for 'cond'
 *   },
 * });
 */
export function useSearchClinicOfficeQuery(baseOptions?: Apollo.QueryHookOptions<SearchClinicOfficeQuery, SearchClinicOfficeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchClinicOfficeQuery, SearchClinicOfficeQueryVariables>(SearchClinicOfficeDocument, options);
      }
export function useSearchClinicOfficeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchClinicOfficeQuery, SearchClinicOfficeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchClinicOfficeQuery, SearchClinicOfficeQueryVariables>(SearchClinicOfficeDocument, options);
        }
// @ts-ignore
export function useSearchClinicOfficeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchClinicOfficeQuery, SearchClinicOfficeQueryVariables>): Apollo.UseSuspenseQueryResult<SearchClinicOfficeQuery, SearchClinicOfficeQueryVariables>;
export function useSearchClinicOfficeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchClinicOfficeQuery, SearchClinicOfficeQueryVariables>): Apollo.UseSuspenseQueryResult<SearchClinicOfficeQuery | undefined, SearchClinicOfficeQueryVariables>;
export function useSearchClinicOfficeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchClinicOfficeQuery, SearchClinicOfficeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchClinicOfficeQuery, SearchClinicOfficeQueryVariables>(SearchClinicOfficeDocument, options);
        }
export type SearchClinicOfficeQueryHookResult = ReturnType<typeof useSearchClinicOfficeQuery>;
export type SearchClinicOfficeLazyQueryHookResult = ReturnType<typeof useSearchClinicOfficeLazyQuery>;
export type SearchClinicOfficeSuspenseQueryHookResult = ReturnType<typeof useSearchClinicOfficeSuspenseQuery>;
export type SearchClinicOfficeQueryResult = Apollo.QueryResult<SearchClinicOfficeQuery, SearchClinicOfficeQueryVariables>;
export const GetForUpdateClinicOfficeDocument = gql`
    mutation getForUpdateClinicOffice($id: ID!) {
  packet {
    getClinicOffice(id: $id) {
      ...ClinicOfficeAttributes
    }
  }
}
    ${ClinicOfficeAttributesFragmentDoc}`;
export type GetForUpdateClinicOfficeMutationFn = Apollo.MutationFunction<GetForUpdateClinicOfficeMutation, GetForUpdateClinicOfficeMutationVariables>;

/**
 * __useGetForUpdateClinicOfficeMutation__
 *
 * To run a mutation, you first call `useGetForUpdateClinicOfficeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetForUpdateClinicOfficeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getForUpdateClinicOfficeMutation, { data, loading, error }] = useGetForUpdateClinicOfficeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetForUpdateClinicOfficeMutation(baseOptions?: Apollo.MutationHookOptions<GetForUpdateClinicOfficeMutation, GetForUpdateClinicOfficeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetForUpdateClinicOfficeMutation, GetForUpdateClinicOfficeMutationVariables>(GetForUpdateClinicOfficeDocument, options);
      }
export type GetForUpdateClinicOfficeMutationHookResult = ReturnType<typeof useGetForUpdateClinicOfficeMutation>;
export type GetForUpdateClinicOfficeMutationResult = Apollo.MutationResult<GetForUpdateClinicOfficeMutation>;
export type GetForUpdateClinicOfficeMutationOptions = Apollo.BaseMutationOptions<GetForUpdateClinicOfficeMutation, GetForUpdateClinicOfficeMutationVariables>;
export const CreateClinicOfficeDocument = gql`
    mutation createClinicOffice($input: _CreateClinicOfficeInput!) {
  packet {
    createClinicOffice(input: $input) {
      ...ClinicOfficeAttributes
    }
  }
}
    ${ClinicOfficeAttributesFragmentDoc}`;
export type CreateClinicOfficeMutationFn = Apollo.MutationFunction<CreateClinicOfficeMutation, CreateClinicOfficeMutationVariables>;

/**
 * __useCreateClinicOfficeMutation__
 *
 * To run a mutation, you first call `useCreateClinicOfficeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClinicOfficeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClinicOfficeMutation, { data, loading, error }] = useCreateClinicOfficeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClinicOfficeMutation(baseOptions?: Apollo.MutationHookOptions<CreateClinicOfficeMutation, CreateClinicOfficeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClinicOfficeMutation, CreateClinicOfficeMutationVariables>(CreateClinicOfficeDocument, options);
      }
export type CreateClinicOfficeMutationHookResult = ReturnType<typeof useCreateClinicOfficeMutation>;
export type CreateClinicOfficeMutationResult = Apollo.MutationResult<CreateClinicOfficeMutation>;
export type CreateClinicOfficeMutationOptions = Apollo.BaseMutationOptions<CreateClinicOfficeMutation, CreateClinicOfficeMutationVariables>;
export const UpdateClinicOfficeDocument = gql`
    mutation updateClinicOffice($input: _UpdateClinicOfficeInput!) {
  packet {
    updateClinicOffice(input: $input) {
      ...ClinicOfficeAttributes
    }
  }
}
    ${ClinicOfficeAttributesFragmentDoc}`;
export type UpdateClinicOfficeMutationFn = Apollo.MutationFunction<UpdateClinicOfficeMutation, UpdateClinicOfficeMutationVariables>;

/**
 * __useUpdateClinicOfficeMutation__
 *
 * To run a mutation, you first call `useUpdateClinicOfficeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClinicOfficeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClinicOfficeMutation, { data, loading, error }] = useUpdateClinicOfficeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateClinicOfficeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClinicOfficeMutation, UpdateClinicOfficeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClinicOfficeMutation, UpdateClinicOfficeMutationVariables>(UpdateClinicOfficeDocument, options);
      }
export type UpdateClinicOfficeMutationHookResult = ReturnType<typeof useUpdateClinicOfficeMutation>;
export type UpdateClinicOfficeMutationResult = Apollo.MutationResult<UpdateClinicOfficeMutation>;
export type UpdateClinicOfficeMutationOptions = Apollo.BaseMutationOptions<UpdateClinicOfficeMutation, UpdateClinicOfficeMutationVariables>;
export const DeleteClinicOfficeDocument = gql`
    mutation deleteClinicOffice($id: ID!) {
  packet {
    deleteClinicOffice(id: $id)
  }
}
    `;
export type DeleteClinicOfficeMutationFn = Apollo.MutationFunction<DeleteClinicOfficeMutation, DeleteClinicOfficeMutationVariables>;

/**
 * __useDeleteClinicOfficeMutation__
 *
 * To run a mutation, you first call `useDeleteClinicOfficeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClinicOfficeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClinicOfficeMutation, { data, loading, error }] = useDeleteClinicOfficeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClinicOfficeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClinicOfficeMutation, DeleteClinicOfficeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClinicOfficeMutation, DeleteClinicOfficeMutationVariables>(DeleteClinicOfficeDocument, options);
      }
export type DeleteClinicOfficeMutationHookResult = ReturnType<typeof useDeleteClinicOfficeMutation>;
export type DeleteClinicOfficeMutationResult = Apollo.MutationResult<DeleteClinicOfficeMutation>;
export type DeleteClinicOfficeMutationOptions = Apollo.BaseMutationOptions<DeleteClinicOfficeMutation, DeleteClinicOfficeMutationVariables>;
export const SearchCustomerDocument = gql`
    query searchCustomer($cond: String) {
  searchCustomer(cond: $cond) {
    elems {
      ...CustomerAttributes
    }
  }
}
    ${CustomerAttributesFragmentDoc}`;

/**
 * __useSearchCustomerQuery__
 *
 * To run a query within a React component, call `useSearchCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCustomerQuery({
 *   variables: {
 *      cond: // value for 'cond'
 *   },
 * });
 */
export function useSearchCustomerQuery(baseOptions?: Apollo.QueryHookOptions<SearchCustomerQuery, SearchCustomerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCustomerQuery, SearchCustomerQueryVariables>(SearchCustomerDocument, options);
      }
export function useSearchCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCustomerQuery, SearchCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCustomerQuery, SearchCustomerQueryVariables>(SearchCustomerDocument, options);
        }
// @ts-ignore
export function useSearchCustomerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchCustomerQuery, SearchCustomerQueryVariables>): Apollo.UseSuspenseQueryResult<SearchCustomerQuery, SearchCustomerQueryVariables>;
export function useSearchCustomerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchCustomerQuery, SearchCustomerQueryVariables>): Apollo.UseSuspenseQueryResult<SearchCustomerQuery | undefined, SearchCustomerQueryVariables>;
export function useSearchCustomerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchCustomerQuery, SearchCustomerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchCustomerQuery, SearchCustomerQueryVariables>(SearchCustomerDocument, options);
        }
export type SearchCustomerQueryHookResult = ReturnType<typeof useSearchCustomerQuery>;
export type SearchCustomerLazyQueryHookResult = ReturnType<typeof useSearchCustomerLazyQuery>;
export type SearchCustomerSuspenseQueryHookResult = ReturnType<typeof useSearchCustomerSuspenseQuery>;
export type SearchCustomerQueryResult = Apollo.QueryResult<SearchCustomerQuery, SearchCustomerQueryVariables>;
export const GetForUpdateCustomerDocument = gql`
    mutation getForUpdateCustomer($id: ID!) {
  packet {
    getCustomer(id: $id) {
      ...CustomerAttributes
    }
  }
}
    ${CustomerAttributesFragmentDoc}`;
export type GetForUpdateCustomerMutationFn = Apollo.MutationFunction<GetForUpdateCustomerMutation, GetForUpdateCustomerMutationVariables>;

/**
 * __useGetForUpdateCustomerMutation__
 *
 * To run a mutation, you first call `useGetForUpdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetForUpdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getForUpdateCustomerMutation, { data, loading, error }] = useGetForUpdateCustomerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetForUpdateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<GetForUpdateCustomerMutation, GetForUpdateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetForUpdateCustomerMutation, GetForUpdateCustomerMutationVariables>(GetForUpdateCustomerDocument, options);
      }
export type GetForUpdateCustomerMutationHookResult = ReturnType<typeof useGetForUpdateCustomerMutation>;
export type GetForUpdateCustomerMutationResult = Apollo.MutationResult<GetForUpdateCustomerMutation>;
export type GetForUpdateCustomerMutationOptions = Apollo.BaseMutationOptions<GetForUpdateCustomerMutation, GetForUpdateCustomerMutationVariables>;
export const CreateCustomerDocument = gql`
    mutation createCustomer($input: _CreateCustomerInput!) {
  packet {
    createCustomer(input: $input) {
      ...CustomerAttributes
    }
  }
}
    ${CustomerAttributesFragmentDoc}`;
export type CreateCustomerMutationFn = Apollo.MutationFunction<CreateCustomerMutation, CreateCustomerMutationVariables>;

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerMutation, CreateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument, options);
      }
export type CreateCustomerMutationHookResult = ReturnType<typeof useCreateCustomerMutation>;
export type CreateCustomerMutationResult = Apollo.MutationResult<CreateCustomerMutation>;
export type CreateCustomerMutationOptions = Apollo.BaseMutationOptions<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const UpdateCustomerDocument = gql`
    mutation updateCustomer($input: _UpdateCustomerInput!) {
  packet {
    updateCustomer(input: $input) {
      ...CustomerAttributes
    }
  }
}
    ${CustomerAttributesFragmentDoc}`;
export type UpdateCustomerMutationFn = Apollo.MutationFunction<UpdateCustomerMutation, UpdateCustomerMutationVariables>;

/**
 * __useUpdateCustomerMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerMutation, { data, loading, error }] = useUpdateCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UpdateCustomerDocument, options);
      }
export type UpdateCustomerMutationHookResult = ReturnType<typeof useUpdateCustomerMutation>;
export type UpdateCustomerMutationResult = Apollo.MutationResult<UpdateCustomerMutation>;
export type UpdateCustomerMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const DeleteCustomerDocument = gql`
    mutation deleteCustomer($id: ID!) {
  packet {
    deleteCustomer(id: $id)
  }
}
    `;
export type DeleteCustomerMutationFn = Apollo.MutationFunction<DeleteCustomerMutation, DeleteCustomerMutationVariables>;

/**
 * __useDeleteCustomerMutation__
 *
 * To run a mutation, you first call `useDeleteCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCustomerMutation, { data, loading, error }] = useDeleteCustomerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCustomerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCustomerMutation, DeleteCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCustomerMutation, DeleteCustomerMutationVariables>(DeleteCustomerDocument, options);
      }
export type DeleteCustomerMutationHookResult = ReturnType<typeof useDeleteCustomerMutation>;
export type DeleteCustomerMutationResult = Apollo.MutationResult<DeleteCustomerMutation>;
export type DeleteCustomerMutationOptions = Apollo.BaseMutationOptions<DeleteCustomerMutation, DeleteCustomerMutationVariables>;
export const SearchDoctorDocument = gql`
    query searchDoctor($cond: String) {
  searchDoctor(cond: $cond) {
    elems {
      ...DoctorAttributes
    }
  }
}
    ${DoctorAttributesFragmentDoc}`;

/**
 * __useSearchDoctorQuery__
 *
 * To run a query within a React component, call `useSearchDoctorQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchDoctorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchDoctorQuery({
 *   variables: {
 *      cond: // value for 'cond'
 *   },
 * });
 */
export function useSearchDoctorQuery(baseOptions?: Apollo.QueryHookOptions<SearchDoctorQuery, SearchDoctorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchDoctorQuery, SearchDoctorQueryVariables>(SearchDoctorDocument, options);
      }
export function useSearchDoctorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchDoctorQuery, SearchDoctorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchDoctorQuery, SearchDoctorQueryVariables>(SearchDoctorDocument, options);
        }
// @ts-ignore
export function useSearchDoctorSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchDoctorQuery, SearchDoctorQueryVariables>): Apollo.UseSuspenseQueryResult<SearchDoctorQuery, SearchDoctorQueryVariables>;
export function useSearchDoctorSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchDoctorQuery, SearchDoctorQueryVariables>): Apollo.UseSuspenseQueryResult<SearchDoctorQuery | undefined, SearchDoctorQueryVariables>;
export function useSearchDoctorSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchDoctorQuery, SearchDoctorQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchDoctorQuery, SearchDoctorQueryVariables>(SearchDoctorDocument, options);
        }
export type SearchDoctorQueryHookResult = ReturnType<typeof useSearchDoctorQuery>;
export type SearchDoctorLazyQueryHookResult = ReturnType<typeof useSearchDoctorLazyQuery>;
export type SearchDoctorSuspenseQueryHookResult = ReturnType<typeof useSearchDoctorSuspenseQuery>;
export type SearchDoctorQueryResult = Apollo.QueryResult<SearchDoctorQuery, SearchDoctorQueryVariables>;
export const GetForUpdateDoctorDocument = gql`
    mutation getForUpdateDoctor($id: ID!) {
  packet {
    getDoctor(id: $id) {
      ...DoctorAttributes
    }
  }
}
    ${DoctorAttributesFragmentDoc}`;
export type GetForUpdateDoctorMutationFn = Apollo.MutationFunction<GetForUpdateDoctorMutation, GetForUpdateDoctorMutationVariables>;

/**
 * __useGetForUpdateDoctorMutation__
 *
 * To run a mutation, you first call `useGetForUpdateDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetForUpdateDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getForUpdateDoctorMutation, { data, loading, error }] = useGetForUpdateDoctorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetForUpdateDoctorMutation(baseOptions?: Apollo.MutationHookOptions<GetForUpdateDoctorMutation, GetForUpdateDoctorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetForUpdateDoctorMutation, GetForUpdateDoctorMutationVariables>(GetForUpdateDoctorDocument, options);
      }
export type GetForUpdateDoctorMutationHookResult = ReturnType<typeof useGetForUpdateDoctorMutation>;
export type GetForUpdateDoctorMutationResult = Apollo.MutationResult<GetForUpdateDoctorMutation>;
export type GetForUpdateDoctorMutationOptions = Apollo.BaseMutationOptions<GetForUpdateDoctorMutation, GetForUpdateDoctorMutationVariables>;
export const CreateDoctorDocument = gql`
    mutation createDoctor($input: _CreateDoctorInput!) {
  packet {
    createDoctor(input: $input) {
      ...DoctorAttributes
    }
  }
}
    ${DoctorAttributesFragmentDoc}`;
export type CreateDoctorMutationFn = Apollo.MutationFunction<CreateDoctorMutation, CreateDoctorMutationVariables>;

/**
 * __useCreateDoctorMutation__
 *
 * To run a mutation, you first call `useCreateDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDoctorMutation, { data, loading, error }] = useCreateDoctorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDoctorMutation(baseOptions?: Apollo.MutationHookOptions<CreateDoctorMutation, CreateDoctorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDoctorMutation, CreateDoctorMutationVariables>(CreateDoctorDocument, options);
      }
export type CreateDoctorMutationHookResult = ReturnType<typeof useCreateDoctorMutation>;
export type CreateDoctorMutationResult = Apollo.MutationResult<CreateDoctorMutation>;
export type CreateDoctorMutationOptions = Apollo.BaseMutationOptions<CreateDoctorMutation, CreateDoctorMutationVariables>;
export const UpdateDoctorDocument = gql`
    mutation updateDoctor($input: _UpdateDoctorInput!) {
  packet {
    updateDoctor(input: $input) {
      ...DoctorAttributes
    }
  }
}
    ${DoctorAttributesFragmentDoc}`;
export type UpdateDoctorMutationFn = Apollo.MutationFunction<UpdateDoctorMutation, UpdateDoctorMutationVariables>;

/**
 * __useUpdateDoctorMutation__
 *
 * To run a mutation, you first call `useUpdateDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDoctorMutation, { data, loading, error }] = useUpdateDoctorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDoctorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDoctorMutation, UpdateDoctorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDoctorMutation, UpdateDoctorMutationVariables>(UpdateDoctorDocument, options);
      }
export type UpdateDoctorMutationHookResult = ReturnType<typeof useUpdateDoctorMutation>;
export type UpdateDoctorMutationResult = Apollo.MutationResult<UpdateDoctorMutation>;
export type UpdateDoctorMutationOptions = Apollo.BaseMutationOptions<UpdateDoctorMutation, UpdateDoctorMutationVariables>;
export const DeleteDoctorDocument = gql`
    mutation deleteDoctor($id: ID!) {
  packet {
    deleteDoctor(id: $id)
  }
}
    `;
export type DeleteDoctorMutationFn = Apollo.MutationFunction<DeleteDoctorMutation, DeleteDoctorMutationVariables>;

/**
 * __useDeleteDoctorMutation__
 *
 * To run a mutation, you first call `useDeleteDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDoctorMutation, { data, loading, error }] = useDeleteDoctorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDoctorMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDoctorMutation, DeleteDoctorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDoctorMutation, DeleteDoctorMutationVariables>(DeleteDoctorDocument, options);
      }
export type DeleteDoctorMutationHookResult = ReturnType<typeof useDeleteDoctorMutation>;
export type DeleteDoctorMutationResult = Apollo.MutationResult<DeleteDoctorMutation>;
export type DeleteDoctorMutationOptions = Apollo.BaseMutationOptions<DeleteDoctorMutation, DeleteDoctorMutationVariables>;
export const SearchPersonDocument = gql`
    query searchPerson($cond: String) {
  searchPerson(cond: $cond) {
    elems {
      ...PersonAttributes
    }
  }
}
    ${PersonAttributesFragmentDoc}`;

/**
 * __useSearchPersonQuery__
 *
 * To run a query within a React component, call `useSearchPersonQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPersonQuery({
 *   variables: {
 *      cond: // value for 'cond'
 *   },
 * });
 */
export function useSearchPersonQuery(baseOptions?: Apollo.QueryHookOptions<SearchPersonQuery, SearchPersonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPersonQuery, SearchPersonQueryVariables>(SearchPersonDocument, options);
      }
export function useSearchPersonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPersonQuery, SearchPersonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPersonQuery, SearchPersonQueryVariables>(SearchPersonDocument, options);
        }
// @ts-ignore
export function useSearchPersonSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchPersonQuery, SearchPersonQueryVariables>): Apollo.UseSuspenseQueryResult<SearchPersonQuery, SearchPersonQueryVariables>;
export function useSearchPersonSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchPersonQuery, SearchPersonQueryVariables>): Apollo.UseSuspenseQueryResult<SearchPersonQuery | undefined, SearchPersonQueryVariables>;
export function useSearchPersonSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchPersonQuery, SearchPersonQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchPersonQuery, SearchPersonQueryVariables>(SearchPersonDocument, options);
        }
export type SearchPersonQueryHookResult = ReturnType<typeof useSearchPersonQuery>;
export type SearchPersonLazyQueryHookResult = ReturnType<typeof useSearchPersonLazyQuery>;
export type SearchPersonSuspenseQueryHookResult = ReturnType<typeof useSearchPersonSuspenseQuery>;
export type SearchPersonQueryResult = Apollo.QueryResult<SearchPersonQuery, SearchPersonQueryVariables>;
export const GetForUpdatePersonDocument = gql`
    mutation getForUpdatePerson($id: ID!) {
  packet {
    getPerson(id: $id) {
      ...PersonAttributes
    }
  }
}
    ${PersonAttributesFragmentDoc}`;
export type GetForUpdatePersonMutationFn = Apollo.MutationFunction<GetForUpdatePersonMutation, GetForUpdatePersonMutationVariables>;

/**
 * __useGetForUpdatePersonMutation__
 *
 * To run a mutation, you first call `useGetForUpdatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetForUpdatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getForUpdatePersonMutation, { data, loading, error }] = useGetForUpdatePersonMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetForUpdatePersonMutation(baseOptions?: Apollo.MutationHookOptions<GetForUpdatePersonMutation, GetForUpdatePersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetForUpdatePersonMutation, GetForUpdatePersonMutationVariables>(GetForUpdatePersonDocument, options);
      }
export type GetForUpdatePersonMutationHookResult = ReturnType<typeof useGetForUpdatePersonMutation>;
export type GetForUpdatePersonMutationResult = Apollo.MutationResult<GetForUpdatePersonMutation>;
export type GetForUpdatePersonMutationOptions = Apollo.BaseMutationOptions<GetForUpdatePersonMutation, GetForUpdatePersonMutationVariables>;
export const CreatePersonDocument = gql`
    mutation createPerson($input: _CreatePersonInput!) {
  packet {
    createPerson(input: $input) {
      ...PersonAttributes
    }
  }
}
    ${PersonAttributesFragmentDoc}`;
export type CreatePersonMutationFn = Apollo.MutationFunction<CreatePersonMutation, CreatePersonMutationVariables>;

/**
 * __useCreatePersonMutation__
 *
 * To run a mutation, you first call `useCreatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonMutation, { data, loading, error }] = useCreatePersonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePersonMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonMutation, CreatePersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonMutation, CreatePersonMutationVariables>(CreatePersonDocument, options);
      }
export type CreatePersonMutationHookResult = ReturnType<typeof useCreatePersonMutation>;
export type CreatePersonMutationResult = Apollo.MutationResult<CreatePersonMutation>;
export type CreatePersonMutationOptions = Apollo.BaseMutationOptions<CreatePersonMutation, CreatePersonMutationVariables>;
export const UpdatePersonDocument = gql`
    mutation updatePerson($input: _UpdatePersonInput!) {
  packet {
    updatePerson(input: $input) {
      ...PersonAttributes
    }
  }
}
    ${PersonAttributesFragmentDoc}`;
export type UpdatePersonMutationFn = Apollo.MutationFunction<UpdatePersonMutation, UpdatePersonMutationVariables>;

/**
 * __useUpdatePersonMutation__
 *
 * To run a mutation, you first call `useUpdatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonMutation, { data, loading, error }] = useUpdatePersonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePersonMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePersonMutation, UpdatePersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePersonMutation, UpdatePersonMutationVariables>(UpdatePersonDocument, options);
      }
export type UpdatePersonMutationHookResult = ReturnType<typeof useUpdatePersonMutation>;
export type UpdatePersonMutationResult = Apollo.MutationResult<UpdatePersonMutation>;
export type UpdatePersonMutationOptions = Apollo.BaseMutationOptions<UpdatePersonMutation, UpdatePersonMutationVariables>;
export const DeletePersonDocument = gql`
    mutation deletePerson($id: ID!) {
  packet {
    deletePerson(id: $id)
  }
}
    `;
export type DeletePersonMutationFn = Apollo.MutationFunction<DeletePersonMutation, DeletePersonMutationVariables>;

/**
 * __useDeletePersonMutation__
 *
 * To run a mutation, you first call `useDeletePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePersonMutation, { data, loading, error }] = useDeletePersonMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePersonMutation(baseOptions?: Apollo.MutationHookOptions<DeletePersonMutation, DeletePersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePersonMutation, DeletePersonMutationVariables>(DeletePersonDocument, options);
      }
export type DeletePersonMutationHookResult = ReturnType<typeof useDeletePersonMutation>;
export type DeletePersonMutationResult = Apollo.MutationResult<DeletePersonMutation>;
export type DeletePersonMutationOptions = Apollo.BaseMutationOptions<DeletePersonMutation, DeletePersonMutationVariables>;
export const SearchDoctorTypeDocument = gql`
    query searchDoctorType($cond: String) {
  searchDoctorType(cond: $cond) {
    elems {
      ...DoctorTypeAttributes
    }
  }
}
    ${DoctorTypeAttributesFragmentDoc}`;

/**
 * __useSearchDoctorTypeQuery__
 *
 * To run a query within a React component, call `useSearchDoctorTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchDoctorTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchDoctorTypeQuery({
 *   variables: {
 *      cond: // value for 'cond'
 *   },
 * });
 */
export function useSearchDoctorTypeQuery(baseOptions?: Apollo.QueryHookOptions<SearchDoctorTypeQuery, SearchDoctorTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchDoctorTypeQuery, SearchDoctorTypeQueryVariables>(SearchDoctorTypeDocument, options);
      }
export function useSearchDoctorTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchDoctorTypeQuery, SearchDoctorTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchDoctorTypeQuery, SearchDoctorTypeQueryVariables>(SearchDoctorTypeDocument, options);
        }
// @ts-ignore
export function useSearchDoctorTypeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchDoctorTypeQuery, SearchDoctorTypeQueryVariables>): Apollo.UseSuspenseQueryResult<SearchDoctorTypeQuery, SearchDoctorTypeQueryVariables>;
export function useSearchDoctorTypeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchDoctorTypeQuery, SearchDoctorTypeQueryVariables>): Apollo.UseSuspenseQueryResult<SearchDoctorTypeQuery | undefined, SearchDoctorTypeQueryVariables>;
export function useSearchDoctorTypeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchDoctorTypeQuery, SearchDoctorTypeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchDoctorTypeQuery, SearchDoctorTypeQueryVariables>(SearchDoctorTypeDocument, options);
        }
export type SearchDoctorTypeQueryHookResult = ReturnType<typeof useSearchDoctorTypeQuery>;
export type SearchDoctorTypeLazyQueryHookResult = ReturnType<typeof useSearchDoctorTypeLazyQuery>;
export type SearchDoctorTypeSuspenseQueryHookResult = ReturnType<typeof useSearchDoctorTypeSuspenseQuery>;
export type SearchDoctorTypeQueryResult = Apollo.QueryResult<SearchDoctorTypeQuery, SearchDoctorTypeQueryVariables>;
export const GetForUpdateDoctorTypeDocument = gql`
    mutation getForUpdateDoctorType($id: ID!) {
  packet: dictionaryPacket {
    getDoctorType(id: $id) {
      ...DoctorTypeAttributes
    }
  }
}
    ${DoctorTypeAttributesFragmentDoc}`;
export type GetForUpdateDoctorTypeMutationFn = Apollo.MutationFunction<GetForUpdateDoctorTypeMutation, GetForUpdateDoctorTypeMutationVariables>;

/**
 * __useGetForUpdateDoctorTypeMutation__
 *
 * To run a mutation, you first call `useGetForUpdateDoctorTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetForUpdateDoctorTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getForUpdateDoctorTypeMutation, { data, loading, error }] = useGetForUpdateDoctorTypeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetForUpdateDoctorTypeMutation(baseOptions?: Apollo.MutationHookOptions<GetForUpdateDoctorTypeMutation, GetForUpdateDoctorTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetForUpdateDoctorTypeMutation, GetForUpdateDoctorTypeMutationVariables>(GetForUpdateDoctorTypeDocument, options);
      }
export type GetForUpdateDoctorTypeMutationHookResult = ReturnType<typeof useGetForUpdateDoctorTypeMutation>;
export type GetForUpdateDoctorTypeMutationResult = Apollo.MutationResult<GetForUpdateDoctorTypeMutation>;
export type GetForUpdateDoctorTypeMutationOptions = Apollo.BaseMutationOptions<GetForUpdateDoctorTypeMutation, GetForUpdateDoctorTypeMutationVariables>;
export const UpdateOrCreateDoctorTypeDocument = gql`
    mutation updateOrCreateDoctorType($input: _CreateDoctorTypeInput!) {
  dictionaryPacket {
    updateOrCreateDoctorType(input: $input) {
      returning {
        ...DoctorTypeAttributes
      }
    }
  }
}
    ${DoctorTypeAttributesFragmentDoc}`;
export type UpdateOrCreateDoctorTypeMutationFn = Apollo.MutationFunction<UpdateOrCreateDoctorTypeMutation, UpdateOrCreateDoctorTypeMutationVariables>;

/**
 * __useUpdateOrCreateDoctorTypeMutation__
 *
 * To run a mutation, you first call `useUpdateOrCreateDoctorTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrCreateDoctorTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrCreateDoctorTypeMutation, { data, loading, error }] = useUpdateOrCreateDoctorTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrCreateDoctorTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrCreateDoctorTypeMutation, UpdateOrCreateDoctorTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrCreateDoctorTypeMutation, UpdateOrCreateDoctorTypeMutationVariables>(UpdateOrCreateDoctorTypeDocument, options);
      }
export type UpdateOrCreateDoctorTypeMutationHookResult = ReturnType<typeof useUpdateOrCreateDoctorTypeMutation>;
export type UpdateOrCreateDoctorTypeMutationResult = Apollo.MutationResult<UpdateOrCreateDoctorTypeMutation>;
export type UpdateOrCreateDoctorTypeMutationOptions = Apollo.BaseMutationOptions<UpdateOrCreateDoctorTypeMutation, UpdateOrCreateDoctorTypeMutationVariables>;