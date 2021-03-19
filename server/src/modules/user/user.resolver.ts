import { GraphqlReq } from '@common/decorators/request-grapql.decorator';
import { HttpException } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { CartItem, CartItemInput } from './dto';
import { User } from './user.schema';

@Resolver(() => User)
export class UserResolver {
	@Mutation(() => [CartItem])
	public async addToCart(input: CartItemInput, @GraphqlReq() req: Request) {
		try {
			let cart: CartItem[] = this.getCartFromCookies(req);

			const indexItem = cart.findIndex((item) => item.product._id == input.product._id);

			// If indexItem > 0 ==> item existed already in cart --> increase amount
			if (indexItem >= 0) {
				cart = cart.map((item) =>
					item.product._id == input.product._id
						? { ...item, quantity: item.quantity + input.quantity }
						: item,
				);
			} else {
				cart.push(input); // Item not exists in cart
			}
			req.session.cart = JSON.stringify(cart);
			return cart;
		} catch (error) {
			throw new HttpException(error.message, 500);
		}
	}

	@Mutation(() => [CartItem])
	public async updateCart(input: CartItemInput, @GraphqlReq() req: Request) {
		try {
			const productId = input.product._id;
			let cart: CartItem[] = this.getCartFromCookies(req);
			cart = cart.map((item) =>
				item.product._id == productId ? { ...item, quantity: input.quantity } : item,
			);
			return cart;
		} catch (error) {
			throw new HttpException(error.message, 500);
		}
	}

	@Mutation(() => [CartItem])
	public async removeItemFromCart(productId: string, @GraphqlReq() req: Request) {
		try {
			let cart: CartItem[] = this.getCartFromCookies(req);
			cart = cart.filter((item) => item.product._id != productId);
			return cart;
		} catch (error) {
			throw new HttpException(error.message, 500);
		}
	}

	/* Private helper methods*/
	private getCartFromCookies(req: Request): CartItem[] {
		const cartCookies = req.session?.cart;
		let cart: CartItem[] = [];
		if (cartCookies) cart = JSON.parse(cartCookies);
		return cart;
	}
}
