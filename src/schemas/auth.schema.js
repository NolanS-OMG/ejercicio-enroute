import {z} from 'zod';

export const resistanceSchema = z.object({
  band_one: z.string({
    required_error: "Band One is Required"
  }),
  band_two: z.string({
    required_error: "Band two is Required"
  }),
  multiplier: z.string({
    required_error: "Multiplier is Required"
  }),
  tolerance: z.string({
    required_error: "Tolerance is Required"
  }),
})