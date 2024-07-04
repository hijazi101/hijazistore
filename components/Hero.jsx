"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import app from '@/firebaseconfig';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


  const AddToCartButton = () => {
    const router = useRouter();
  
    const handleAddCart = (e) => {
      e.preventDefault();
      // Your logic here
      router.push('/Addtocart'); // Replace with your navigation path
    };
  
  return (
    <button
      className="bg-green-500 w-full p-1 mt-1 rounded-md text-white"
      onClick={handleAddCart}
    >
      Add To Cart
    </button>
  );
};

const Hero = () => {
  const { data: session } = useSession(); // Retrieve session data from NextAuth
  const [userPost, setUserPost] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    getUserPost();
  }, []);

  const getUserPost = async () => {
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      posts.push(data);
    });
    setUserPost(posts);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 px-10">
        {userPost.map((post) => (
          <div key={post.id} className="bg-white rounded-lg overflow-hidden border shadow-md">
            <img src={post.image} alt={post.name} className="w-full h-40 object-cover"  style={{ minHeight: '300px' }}  />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{post.name}</h3>
              <p className="text-gray-600">Price: {post.price}$</p>
              <AddToCartButton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
