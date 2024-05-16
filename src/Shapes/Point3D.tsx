class Point3D {
    private _x: number;
    private _y: number;
    private _z: number;
  
    constructor(x: number, y: number, z: number) {
      this._x = x;
      this._y = y;
      this._z = z;
    }
  
    // Getter for x
    get x(): number {
      return this._x;
    }
  
    // Setter for x
    set x(value: number) {
      this._x = value;
    }
  
    // Getter for y
    get y(): number {
      return this._y;
    }
  
    // Setter for y
    set y(value: number) {
      this._y = value;
    }
  
    // Getter for z
    get z(): number {
      return this._z;
    }
  
    // Setter for z
    set z(value: number) {
      this._z = value;
    }
  }
  
  export default Point3D;
  