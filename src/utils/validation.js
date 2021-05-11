export const errorMessages = (fields, errors) => {
  console.log("errorMessages", { fields, errors });

  try {
    return (
      errors?.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.path]:
            fields?.find((f) => f?.path === cur?.path)?.message ||
            "unknown error",
        }),
        {}
      ) || {}
    );
  } catch (error) {
    console.error("errorMessages error", { error });
    return {};
  }
};
