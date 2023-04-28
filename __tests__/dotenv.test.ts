describe('environment variables', () => {
	it('reads NODE_ENV successfully', () => {
		expect(process.env['NODE_ENV']).toBeTruthy();
	});

	it('reads the app name as MealMate', () => {
		expect(process.env['APP_NAME']).toBe('MealMate');
	});
});
