export const urlString = (data: object | null) => {
  if (data == null) { return ""; }

  const urlParams = new URLSearchParams();
  const rbracket = /\[\]$/;

  const add = (name: string, valueOrFunction: any) => {
      const value = typeof valueOrFunction === "function" ? valueOrFunction() : valueOrFunction;
      urlParams.append(name, value == null ? "" : value);
  };

  const buildParams = (prefix: string, obj: object) => {
      if (Array.isArray(obj)) {
          obj.forEach((value, index) => {
              if (rbracket.test(prefix)) {
                  add(prefix, value);
              } else {
                  const i = typeof value === "object" && value != null ? index : "";
                  buildParams(`${prefix}[${i}]`, value);
              }
          });
      } else if (typeof obj === "object" && obj != null) {
          for (const [name, value] of Object.entries(obj)) {
              buildParams(`${prefix}[${name}]`, value);
          }
      } else {
          add(prefix, obj);
      }
  };

  if (Array.isArray(data) || data instanceof NodeList) {
      data.forEach(el => add(el.name, el.value));
  } else {
      for (const [name, value] of Object.entries(data)) {
          buildParams(name, value);
      }
  }

  return urlParams.toString();
};
