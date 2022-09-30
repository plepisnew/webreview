const buildLinks = ({ entity, id }) => {
  switch (entity.toLowerCase()) {
    case "user":
      return {
        reviews: `/v2/users/${id || ":id"}/reviews`,
      };
    case "admin":
      return {
        websites: ``,
      };
    case "review":
      return {
        author: `/v2/reviews/${id || ":id"}/writtenBy`,
        moderator: `/v2/reviews/${id || ":id"}/monitoredBy`,
      };
    case "website":
      return {};
    case "auth":
      return {
        login: `/v2/auth/login`,
        register: `/v2/auth/register`,
      };
  }
};

const buildResponse = ({ entity, id, payload }) => {
  return {
    payload,
    links: buildLinks({ entity, id }),
  };
};

module.exports = {
  buildResponse,
};
