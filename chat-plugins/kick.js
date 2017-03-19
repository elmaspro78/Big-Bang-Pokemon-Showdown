exports.commands = {
	rk: 'kick',
	roomkick: 'kick',
	kick: function (target, room, user) {
		if (!target) return;
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser || !targetUser.connected) {
			return this.sendReply("El usuario " + this.targetUsername + " no ha sido encontrado.");
		}
		if (!room.users[targetUser.userid]) {
			return this.sendReply("El usuario " + this.targetUsername + " no está en la sala " + room.id + ".");
		}
		if (!this.can('kick', targetUser, room)) return false;
		var msg = "expulsado de la sala " + room.id + " a " + user.name + (target ? " (Motivo: " + target + ")" : "") + "";
		this.addModCommand("" + targetUser.name + " ha " + msg);
		targetUser.popup("Has sido " + msg);
		targetUser.leaveRoom(room);
	}
};
