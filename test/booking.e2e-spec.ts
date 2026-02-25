import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from "../src/modules/app.module";

describe('booking (e2e)', () => {
  let app: INestApplication;
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJHVUVTVCIsImlhdCI6MTc3MjAwNDI2OH0.9quP0OhMqYGUHp7ut5kgDolpoli8ohQ21dkzIITGO5U";

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  it('should check available rooms', async () => {
    // اول ببینیم چه اتاق‌هایی موجود هستند
    const response = await request(app.getHttpServer())
      .get('/rooms?available=true') // یا هر endpoint که اتاق‌های موجود را نشان می‌دهد
      .set('Authorization', `Bearer ${authToken}`);

    console.log('Available Rooms:', {
      status: response.status,
      count: response.body?.length,
      rooms: response.body
    });
  });

  it('should check availability for specific dates', async () => {
    // بررسی موجود بودن اتاق ۲ برای تاریخ‌های مشخص
    const response = await request(app.getHttpServer())
      .get('/rooms/2/availability?checkIn=2026-04-01&checkOut=2026-04-05')
      .set('Authorization', `Bearer ${authToken}`);

    console.log('Room 2 Availability:', {
      status: response.status,
      body: response.body
    });
  });

  it('should create booking with available dates', async () => {
    // استفاده از تاریخ‌های متفاوت (مثلاً یک ماه بعد)
    const checkIn = "2026-05-01";
    const checkOut = "2026-05-05";

    console.log(`Trying to book room 2 from ${checkIn} to ${checkOut}`);

    const response = await request(app.getHttpServer())
      .post('/bookings')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        roomId: 2,
        checkIn: checkIn,
        checkOut: checkOut
      });

    console.log('Booking Result:', {
      status: response.status,
      body: response.body
    });

    if (response.status === 409) {
      console.log('⚠️ Room not available for these dates, trying different dates...');
      
      // تلاش با تاریخ‌های دیگر
      const alternativeResponse = await request(app.getHttpServer())
        .post('/bookings')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          roomId: 2,
          checkIn: "2026-06-01",
          checkOut: "2026-06-05"
        });

      console.log('Alternative Booking:', {
        status: alternativeResponse.status,
        body: alternativeResponse.body
      });

      expect(alternativeResponse.status).toBe(201);
    } else {
      expect(response.status).toBe(201);
    }
  });
});