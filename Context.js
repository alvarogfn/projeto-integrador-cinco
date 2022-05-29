import React from "react";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const service = {
    getAll: async () => {
      const response = await fetch(
        "https://projeto-integrador-5-default-rtdb.firebaseio.com/services.json"
      );
      const json = await response.json();
      if (json === null || response.status !== 200) throw new Error("");
      return Object.keys(json).map((key) => {
        return { ...json[key], id: key };
      });
    },
    get: async (id) => {
      const url = `https://projeto-integrador-5-default-rtdb.firebaseio.com/services/${id}.json`;
      const response = await fetch(url);
      const json = await response.json();
      if (json === null || response.status !== 200) throw new Error("");

      return { ...json, id };
    },
    put: async (form, id) => {
      const url = `https://projeto-integrador-5-default-rtdb.firebaseio.com/services/${id}.json`;
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) throw new Error(response.status);
    },
    post: async (form) => {
      const url = `https://projeto-integrador-5-default-rtdb.firebaseio.com/services.json`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) throw new Error(response.status);
    },
    delete: async (id) => {
      const url = `https://projeto-integrador-5-default-rtdb.firebaseio.com/services/${id}.json`;
      fetch(url, { method: "DELETE" });
    },
  };

  const course = {
    getAll: async () => {
      const response = await fetch(
        "https://projeto-integrador-5-default-rtdb.firebaseio.com/courses.json"
      );
      const json = await response.json();
      if (json === null || response.status !== 200) throw new Error("");
      return Object.keys(json).map((key) => {
        return { ...json[key], id: key };
      });
    },
    get: async (id) => {
      const url = `https://projeto-integrador-5-default-rtdb.firebaseio.com/courses/${id}.json`;
      const response = await fetch(url);
      const json = await response.json();
      if (json === null || response.status !== 200) throw new Error("");
      return { ...json, id };
    },
    put: async (form, id) => {
      const url = `https://projeto-integrador-5-default-rtdb.firebaseio.com/courses/${id}.json`;
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) throw new Error(response.status);
    },
    post: async (form) => {
      const url = `https://projeto-integrador-5-default-rtdb.firebaseio.com/courses.json`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) throw new Error(response.status);
    },
  };

  const storage = {
    service,
    course,
  };
  return (
    <UserContext.Provider value={storage}>{children}</UserContext.Provider>
  );
};
