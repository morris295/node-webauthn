export class User {
  private username: string;
  private displayName: string;
  private id: string;

  constructor(id: string, username: string, displayname: string) {
    this.$id = id;
    this.$username = username;
    this.$displayName = displayname;
  }

  /**
   * Getter $id
   * @return {string}
   */
  public get $id(): string {
    return this.id;
  }

  /**
   * Setter $id
   * @param {string} value
   */
  public set $id(value: string) {
    this.id = value;
  }

  /**
   * Getter $username
   * @return {string}
   */
  public get $username(): string {
    return this.username;
  }

  /**
   * Setter $username
   * @param {string} value
   */
  public set $username(value: string) {
    this.username = value;
  }

  /**
   * Getter $displayName
   * @return {string}
   */
  public get $displayName(): string {
    return this.displayName;
  }

  /**
   * Setter $displayName
   * @param {string} value
   */
  public set $displayName(value: string) {
    this.displayName = value;
  }
}
