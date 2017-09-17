define(["ecs", "game", "components"], function (ecs, game, components) {
	return { update: function(dt) {
		var monstersCount = 0;
		ecs.for_each([components.Monster], function(entity) {
			monstersCount++;
		});

		// if there are less than 12 monsters...
		if(monstersCount < 12) {
			// ...spawn one every 5 seconds, or N = 7000/dt calls
			// with probability P per call, P * N ~ 1, or P ~ 1 / N

			if(Math.random() < dt / 5000) {

				var object = game.assets.monsterModel.clone();

				var item = new ecs.Entity()
					.add(new components.Monster())
					.add(new components.Body(object))
					.add(new components.AnimatedObject(object))
					.add(new components.Motion())
					.add(new components.PendingAddition(
						0xff7700,
						game.assets.monsterLight,
						game.assets.monsterPlate,
						game.assets.monsterAppeared
					));
			}
		}
	}};
});