import { Entity } from "../common/entity";
import { Optional } from "../common/optional";

export enum CustomerStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REFUSED = "REFUSED",
}

export type CustomerProps = {
  name: string;
  email: string;
  password: string;
  phone: string;
  taxNumber: string;
  address: string;
  status: CustomerStatus;
  createdAt: Date;
};

export class Customer extends Entity<CustomerProps> {
  static create(
    props: Optional<CustomerProps, "status" | "createdAt">,
    id?: string,
  ) {
    return new Customer(
      {
        ...props,
        status: props.status ?? CustomerStatus.PENDING,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }

  get name() {
    return this.props.name;
  }

  set name(name) {
    this.props.name = name;
  }

  get email() {
    return this.props.email;
  }

  set email(email) {
    this.props.email = email;
  }

  get password() {
    return this.props.password;
  }

  set password(password) {
    this.props.password = password;
  }

  get phone() {
    return this.props.phone;
  }

  set phone(phone) {
    this.props.phone = phone;
  }

  get taxNumber() {
    return this.props.taxNumber;
  }

  set taxNumber(taxNumber) {
    this.props.taxNumber = taxNumber;
  }

  get address() {
    return this.props.address;
  }

  set address(address) {
    this.props.address = address;
  }

  get status() {
    return this.props.status;
  }

  private set status(status) {
    this.props.status = status;
  }

  accept() {
    this.status = CustomerStatus.ACCEPTED;
  }

  refuse() {
    this.status = CustomerStatus.REFUSED;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
