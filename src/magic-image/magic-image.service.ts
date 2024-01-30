import { Injectable } from '@nestjs/common';
import Replicate from 'replicate';
import { ImageGenInputDto } from './dto/imageGenInput.dto';

@Injectable()
export class MagicImageService {
  private replicate: Replicate;
  constructor() {
    this.replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
  }

  async generateMagicImage(imageGenInput: ImageGenInputDto) {
    const output = this.replicate.run(
      'zsxkib/instant-id:c98b2e7a196828d00955767813b81fc05c5c9b294c670c6d147d545fed4ceecf',
      {
        input: {
          image: imageGenInput.image,
          width: 640,
          height: 640,
          prompt: imageGenInput.prompt,
          sdxl_weights: 'protovision-xl-high-fidel',
          guidance_scale: 5,
          negative_prompt:
            '(lowres, low quality, worst quality:1.2), (text:1.2), watermark, painting, drawing, illustration, glitch, deformed, mutated, cross-eyed, ugly, disfigured (lowres, low quality, worst quality:1.2), (text:1.2), watermark, painting, drawing, illustration, glitch,deformed, mutated, cross-eyed, ugly, disfigured',
          ip_adapter_scale: 0.8,
          num_inference_steps: 30,
          controlnet_conditioning_scale: 0.8,
        },
      },
    );
    return output;
  }
}
