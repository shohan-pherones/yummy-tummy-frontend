"use client";

import CheckoutButton from "@/components/CheckoutButton";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import MenuItem from "@/components/MenuItem";
import OrderSummery from "@/components/OrderSummery";
import RestaurantInfo from "@/components/RestaurantInfo";
import { UserFormDataType } from "@/components/UserProfileForm";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { useCreateCheckoutSession } from "@/hooks/useCreateCheckoutSession";
import { useGetPublicRestaurant } from "@/hooks/useGetPublicRestaurant";
import { CheckoutSessionRequest, MenuItem as TMenuItem } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

const RestaurantDetailPage = ({
  params,
}: {
  params: { restaurantId: string };
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(
      `cartItems-${params.restaurantId}`
    );

    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const router = useRouter();

  const addToCart = (menuItem: TMenuItem) => {
    setCartItems((prevItems) => {
      const existingCartItem = prevItems.find(
        (item) => item._id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevItems.map((item) =>
          item._id === menuItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCartItems = [
          ...prevItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${params.restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevItems) => {
      const updatedCartItems = prevItems.filter(
        (item) => item._id !== cartItem._id
      );

      sessionStorage.setItem(
        `cartItems-${params.restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const handleQuantityDecrease = (cartItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingCartItem = prevItems.find(
        (item) => item._id === cartItem._id
      );

      let updatedCartItems;

      if (existingCartItem && existingCartItem.quantity > 1) {
        updatedCartItems = prevItems.map((item) =>
          item._id === cartItem._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        updatedCartItems = prevItems.filter(
          (item) => item._id !== cartItem._id
        );
      }

      sessionStorage.setItem(
        `cartItems-${params.restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const handleQuantityIncrease = (cartItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingCartItem = prevItems.find(
        (item) => item._id === cartItem._id
      );

      if (existingCartItem) {
        const updatedCartItems = prevItems.map((item) =>
          item._id === cartItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        sessionStorage.setItem(
          `cartItems-${params.restaurantId}`,
          JSON.stringify(updatedCartItems)
        );

        return updatedCartItems;
      } else {
        return [];
      }
    });
  };

  const handleCheckout = async (userFormData: UserFormDataType) => {
    if (!restaurant) {
      return;
    }

    const checkoutData: CheckoutSessionRequest = {
      cartItems: cartItems.map((item) => ({
        menuItemId: item._id,
        name: item.name,
        quantity: item.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        email: userFormData.email as string,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
      },
    };

    const data = await createCheckoutSession(checkoutData);

    router.replace(data.url);
  };

  const { isLoading, restaurant } = useGetPublicRestaurant(params.restaurantId);

  if (isLoading) {
    return <Loading />;
  }

  if (!restaurant) {
    return <Error message="Restaurant not found" />;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
          fill
          className="w-full h-full object-cover"
        />
      </AspectRatio>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[4fr_2fr] gap-5">
        <div className="flex flex-col gap-5">
          <RestaurantInfo restaurant={restaurant} />
          <h6 className="font-bold text-2xl">Menu</h6>
          {restaurant.menuItems.map((item, index) => (
            <MenuItem
              key={index + item.name}
              item={item}
              addToCart={() => addToCart(item)}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummery
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              handleQuantityDecrease={handleQuantityDecrease}
              handleQuantityIncrease={handleQuantityIncrease}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={handleCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
