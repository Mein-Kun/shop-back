import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorites } from './favorites.model';
import { UsersService } from 'src/users/users.service';
import { AvtoPartsService } from 'src/avto-parts/avto-parts.service';
import { AddToCardDto } from 'src/shopping-card/dto/add-to-card.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorites)
    private favoritesModel: typeof Favorites,
		private readonly usersService: UsersService,
    private readonly avtoPartsService: AvtoPartsService,
  ) {}

	async findAll(userId: number): Promise<Favorites[]> {
    const favoritAll = this.favoritesModel.findAll({ where: { userId } });

    return favoritAll;
  }

  async addfavorit(addToCardDto: AddToCardDto) {
		const favorit = new Favorites();
		const user = await this.usersService.findOne({
      where: { id: addToCardDto.userId },
    });
    const part = await this.avtoPartsService.findOnePart(addToCardDto.partId);

		favorit.userId = user.id;
    favorit.partId = part.id;

		return favorit.save();
	}

	// async compare(partId: number, userId: number): Promise<Favorites[]> {
	// 	const favorit = await this.favoritesModel.findAll({ where: { userId, partId }});
		
	// 	return favorit
	// }

	async remove(partId: number): Promise<void> {
    const part = this.favoritesModel.findOne({ where: { partId } });
    (await part).destroy();
  }
}
