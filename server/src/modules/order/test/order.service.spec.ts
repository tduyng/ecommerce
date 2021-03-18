import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateOrderInput } from '../dto';
import { OrderService } from '../order.service';
import { Order } from '../schemas';

const mockOrder = {
	_id: 'some_id',
} as Order;

describe('OrderService', () => {
	let orderService: OrderService;
	let orderModel: any;

	const mockOrderModel = () => ({
		findOne: jest.fn(),
		findById: jest.fn(),
		find: jest.fn(),
		findByIdAndUpdate: jest.fn(),
		findOneAndUpdate: jest.fn(),
		deleteOne: jest.fn(),
		deleteMany: jest.fn(),
		countDocuments: jest.fn(),
		updateMany: jest.fn(),
		findByIdAndDelete: jest.fn(),
		create: jest.fn(),
	});

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrderService,
				{ provide: getModelToken(Order.name), useFactory: mockOrderModel },
			],
		}).compile();

		orderService = module.get<OrderService>(OrderService);
		orderModel = module.get<Model<Order>>(getModelToken(Order.name));
	});
	it('Should be defined', () => {
		expect(orderService).toBeDefined();
	});

	describe('findManyOrders', () => {
		it('Should return paginated result {count, orders}', async () => {
			orderModel.find.mockImplementation(() => ({
				skip: jest.fn().mockImplementation(() => ({
					limit: jest.fn().mockImplementation(() => ({
						lean: jest.fn().mockReturnValue([mockOrder]),
					})),
				})),
			}));

			orderModel.countDocuments.mockReturnValue(1);
			const result = await orderService.findManyOrders();
			expect(result).toEqual({ count: 1, orders: [mockOrder] });
		});
	});

	describe('findById', () => {
		it('Should return a order', async () => {
			orderModel.findById.mockImplementation(() => ({
				lean: jest.fn().mockReturnValue(mockOrder),
			}));
			const result = await orderService.findOrderById('some_id');
			expect(result).toEqual(mockOrder);
		});
	});

	describe('createOrder', () => {
		it('Should return a order', async () => {
			orderModel.create.mockReturnValue(mockOrder);
			const result = await orderService.createOrder('some_id', {
				paymentMethod: 'some_name',
			} as CreateOrderInput);
			expect(result).toEqual(mockOrder);
		});
	});
});
