import { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { db } from "../../lib/firebase";

const SharedPhotos = ({ chatId, userId }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchSharedPhotos = async () => {
      const storage = getStorage();
      const storageRef = ref(storage, `image/`); // Assuming photos are stored in a folder with chatId

      try {
        // List all items (images) in the folder
        const result = await listAll(storageRef);
        const photoUrls = await Promise.all(
          result.items.map(async (item) => {
            const url = await getDownloadURL(item);
            const metadata = await item.getMetadata();  // Fetching metadata like name, size, type, etc.
            return { url, name: metadata.name, size: metadata.size, type: metadata.contentType, lastModified: metadata.updated };
          })
        );
        setPhotos(photoUrls);
      } catch (error) {
        console.error("Error fetching shared photos from storage: ", error);
      }
    };

    fetchSharedPhotos();
  }, [chatId]);

  return (
    <div className="photos">
      {photos.length > 0 ? (
        photos.map((photo, index) => (
          <div key={index} className="photoItem">
            <div className="photoDetail">
              <img src={photo.url} alt="shared" />
              <span>{photo.name}</span>
              <p>{(photo.size / 1024).toFixed(2)} KB</p>  {/* Convert size to KB */}
              <p>{photo.type}</p>
              <p>{new Date(photo.lastModified).toLocaleDateString()}</p>
            </div>
            <img src="./download.png" alt="Download" className="icon" />
          </div>
        ))
      ) : (
        <p>No shared photos</p>
      )}
    </div>
  );
};

export default SharedPhotos;
