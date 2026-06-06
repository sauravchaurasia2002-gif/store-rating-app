import { useEffect, useState } from "react";
import { getStores } from "../services/storeService";
import {
  getRatings,
  addRating,
  updateRating,
} from "../services/ratingService";

function Stores() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRatings, setSelectedRatings] = useState({});

  const userId = Number(
    localStorage.getItem("userId")
  );

  useEffect(() => {
    fetchStores();
    fetchRatings();
  }, []);

  const fetchStores = async () => {
    try {
      const data = await getStores();

      console.log(
        "Stores Data:",
        data
      );

      setStores(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRatings = async () => {
    try {
      const data = await getRatings();

      console.log(
        "Ratings Data:",
        data
      );

      setRatings(data);

      const userRatings = {};

      data.forEach((rating) => {
        if (
          Number(rating.user_id) ===
          userId
        ) {
          userRatings[
            rating.store_id
          ] = rating.rating;
        }
      });

      setSelectedRatings(
        userRatings
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      store.address
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  const handleRating = async (
    storeId
  ) => {
    const rating =
      selectedRatings[storeId];

    if (!rating) {
      alert(
        "Please select a rating"
      );
      return;
    }

    const existingRating =
      ratings.find(
        (r) =>
          Number(r.user_id) ===
            userId &&
          Number(r.store_id) ===
            storeId
      );

    try {
      if (existingRating) {
        await updateRating(
          userId,
          storeId,
          rating
        );

        alert(
          "Rating Updated Successfully"
        );
      } else {
        await addRating(
          userId,
          storeId,
          rating
        );

        alert(
          "Rating Submitted Successfully"
        );
      }

      fetchStores();
      fetchRatings();
    } catch (error) {
      console.log(error);
      alert(
        "Failed To Submit Rating"
      );
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h1>Stores</h1>

      <input
        type="text"
        placeholder="Search By Name Or Address"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={{
          padding: "8px",
          width: "300px",
        }}
      />

      <br />
      <br />

      <table
        border="1"
        cellPadding="10"
        style={{
          margin: "auto",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>
              Average Rating
            </th>
            <th>
              Your Rating
            </th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredStores.map(
            (store) => (
              <tr key={store.id}>
                <td>
                  {store.id}
                </td>

                <td>
                  {store.name}
                </td>

                <td>
                  {store.email}
                </td>

                <td>
                  {store.address}
                </td>

                <td>
                  {Number(
                    store.average_rating
                  ).toFixed(1)}
                </td>

                <td>
                  <select
                    value={
                      selectedRatings[
                        store.id
                      ] || ""
                    }
                    onChange={(
                      e
                    ) =>
                      setSelectedRatings(
                        {
                          ...selectedRatings,
                          [store.id]:
                            Number(
                              e.target
                                .value
                            ),
                        }
                      )
                    }
                  >
                    <option value="">
                      Select
                    </option>

                    <option value="1">
                      1
                    </option>

                    <option value="2">
                      2
                    </option>

                    <option value="3">
                      3
                    </option>

                    <option value="4">
                      4
                    </option>

                    <option value="5">
                      5
                    </option>
                  </select>
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleRating(
                        store.id
                      )
                    }
                  >
                    {ratings.find(
                      (r) =>
                        Number(
                          r.user_id
                        ) ===
                          userId &&
                        Number(
                          r.store_id
                        ) ===
                          store.id
                    )
                      ? "Update Rating"
                      : "Submit Rating"}
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Stores;